import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import { db } from '../../../firebase';
// import Sidebar from '../../AdminPanel/scenes/global/Sidebar';
// import Topbar from '../../AdminPanel/scenes/global/Topbar';
import TestForm from './global/TestForm';

const CandidateTest = () => {
  const [QuestionId, setQuestionId] = useState(0);
  // const [isSidebar, setIsSidebar] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [language, setLanguage] = useState('English');
  const [answers, setAnswers] = useState(['']);

  const Languages = ['English', 'Punjabi'];

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(db, 'test-questions'),
        where('Language', '==', language) && where('Course','==', 'HMV')
      );
      await getDocs(q).then((response) => {
        let data = response.docs.map((ele) => ({ ...ele.data() }));

        setQuestions(data); // update the questions
        const diff = data.length - answers.length; // calculate diff between answer array and data array
        if (diff > 0) {
          // if diff is +ve, add to the answer array to make it equal in size of to the actual data.
          setAnswers((prev) => [...prev, ...Array(diff).fill('')]);
        }
      });
    };
    getData();
  }, [language]);

  function handleNextQuestion() {
    if (QuestionId < questions.length - 1) {
      setQuestionId((QuestionId) => QuestionId + 1);
    }
  }
  function handlePrevQuestion() {
    if (QuestionId > 0) {
      setQuestionId((QuestionId) => QuestionId - 1);
    }
  }

  function handleLanguageChange(event) {
    const lang = event.target.value;
    setLanguage(lang);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let score = 0;
    for (let chosen = 0; chosen < answers.length; chosen++) {
      if (answers[chosen] === questions[chosen]) {
        score++;
      }
    }
    toast.success(`Score is ${score}`);
    const givedata=async(score)=>{
      const q = query(
        collection(db, 'test-results'),
        where('email', '==', 'HMV') && where('Course','==', 'HMV')
      );
      await getDocs(q).then((response)=>{
        
      })
    }
    givedata();
  }

  return (
    <div className='min-h-screen h-full'>
      {
        /* <div>
        <Topbar />
      </div> */
        <div className='m-20'></div>
      }

      <form
        onSubmit={handleSubmit}
        className='min-h-screen h-full flex flex-row'
      >
        {/* <div>
          <Sidebar isSidebar={isSidebar} />
        </div> */}

        <div className='w-full flex flex-col'>
          <div className='mx-auto flex justify-end w-2/3 '>
            <div className='px-2'>Choose Language</div>
            <select
              className='px-2'
              name='lang'
              id='lang'
              onChange={handleLanguageChange}
            >
              {Languages.map((lang, _) => {
                return (
                  <option key={nanoid()} value={lang}>
                    {lang}
                  </option>
                );
              })}
            </select>
          </div>

          <TestForm
            answers={answers}
            setAnswers={setAnswers}
            data={questions[QuestionId]}
          />

          <div className='w-2/3 mx-auto flex justify-between'>
            <button
              type='button'
              onClick={handlePrevQuestion}
              className='border-2 border-gray-300 px-2 hover:bg-gray-200 active:bg-gray-300'
            >
              Prev
            </button>
            <button
              type='button'
              onClick={handleNextQuestion}
              className='border-2 border-gray-300 px-2 hover:bg-gray-200 active:bg-gray-300'
            >
              Next
            </button>
          </div>

          <button
            className='border-2 border-gray-300 w-2/3 mx-auto my-2 hover:bg-slate-400 hover:text-white active:bg-white'
            type='submit'
          >
            Submit
          </button>
        </div>
        {/* <div className="p-2 border-2 border-black">
          </div> */}
      </form>
    </div>
  );
};

export default CandidateTest;
