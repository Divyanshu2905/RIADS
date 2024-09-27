import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  getDoc
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../../../components/Spinner';
import { useAuth } from '../../../contexts/AuthContext';
import { db, storage } from '../../../firebase';
// import Sidebar from '../../AdminPanel/scenes/global/Sidebar';
// import Topbar from '../../AdminPanel/scenes/global/Topba';
import TestForm from './global/TestForm';
import { Try } from '@mui/icons-material';

const CandidateTest = () => {
  // console.log(useAuth());
  const { currentUser } = useAuth();
  // console.log(currentUser.email);
  const [QuestionId, setQuestionId] = useState(0);
  // const [isSidebar, setIsSidebar] = useState(true);
  const [questions, setQuestions] = useState([]);

  const [questions_eng, setQuestionsEng] = useState([]);
  const [questions_punj, setQuestionsPunj] = useState([]);

  const [questionID, setQuestionID] = useState([]);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [language, setLanguage] = useState('English');
  const [answers, setAnswers] = useState({});

  const Languages = ['English', 'Punjabi'];
  const [loading,setLoading]=useState(true);
  const [data_user, setData] = useState([]);

  // question counter
  const [questionCounter, setQuestionCounter] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, 'users'));
      await getDocs(q).then((response) => {
        let data = response.docs.map((ele) => ({ ...ele.data() }));
        setData(data);
        // console.log(data);
      });
    };
    const fetchData=async()=>{
      try {
        setLoading(true);
        await getData();
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(db, 'test-questions'),
        // language is english, only fetch question id
        where('Language', '==', 'English')
      );
      await getDocs(q).then((response) => {
        let data = response.docs.map((ele) => ({ ...ele.data() }));

        // add question ID to the questionID array
        let questionID = [];
        for (let i = 0; i < data.length; i++) {
          questionID.push(data[i].QuestionId);
        }
        setQuestionID(questionID);

        // randomly select 10 question ID
        let randomQuestions = [];
        for (let i = 0; i < 10; i++) {
          let random = Math.floor(Math.random() * questionID.length);
          randomQuestions.push(questionID[random]);
        }
        setRandomQuestions(randomQuestions);

        // fetch the questions from the database
        const q = query(
          collection(db, 'test-questions'),
          where('Language', '==', 'English')
        );
        getDocs(q).then((response) => {
          let data = response.docs.map((ele) => ({ ...ele.data() }));

          // console.log("THISSS")
          // console.log(data);

          // add questions to the questions array
          let questions = [];
          for (let i = 0; i < data.length; i++) {
            if (randomQuestions.includes(data[i].QuestionId)) {
              questions.push(data[i]);
            }
          }
          setQuestionsEng(questions);
        });

        // fetch the questions from the database
        const q1 = query(
          collection(db, 'test-questions'),
          where('Language', '==', 'Punjabi')
        );
        getDocs(q1).then((response) => {
          let data = response.docs.map((ele) => ({ ...ele.data() }));

          // add questions to the questions array
          let questions = [];
          for (let i = 0; i < data.length; i++) {
            if (randomQuestions.includes(data[i].QuestionId)) {
              questions.push(data[i]);
            }
          }
          setQuestionsPunj(questions);
        });

        console.log(randomQuestions);
        console.log(questions_eng);
        console.log(questions_punj);

        // setQuestions(data); // update the questions
        // const diff = data.length - answers.length; // calculate diff between answer array and data array
        // if (diff > 0) {
        //   // if diff is +ve, add to the answer array to make it equal in size of to the actual data.
        //   setAnswers((prev) => [...prev, ...Array(diff).fill('')]);
        // }
        // console.log(data);
      });
    };
    const fetchData=async()=>{
      try {
        setLoading(true);
        await getData();
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  function handleNextQuestion() {
    // if (QuestionId < questions.length - 1) {
    //     setQuestionId((QuestionId) => QuestionId + 1);
    // }

    if (questionCounter < 10) {
      setQuestionCounter((questionCounter) => questionCounter + 1);
    }

    // add 25 questions to the firebase
    // const add_ques = async (data) => {
    //     try {
    //         console.log(data);
    //         // setOpen(false);

    //         // setError('');
    //         // setLoading(true);

    //         data.id = uuidv4();

    //         // tkae data from form and upload it to firebase
    //         const uploadData = async (data) => {
    //             try {

    //                 const engData = {
    //                     QuestionId: data.id,
    //                     Content: data.content_eng,
    //                     Options: [data.option1_eng, data.option2_eng, data.option3_eng, data.option4_eng],
    //                     Correct_option: data.correct_option,
    //                     Image: data.img,
    //                     Language: 'English'
    //                 }

    //                 const punjData = {
    //                     QuestionId: data.id,
    //                     Content: data.content_punj,
    //                     Options: [data.option1_punj, data.option2_punj, data.option3_punj, data.option4_punj],
    //                     Correct_option: data.correct_option,
    //                     Image: data.img,
    //                     Language: 'Punjabi'
    //                 }

    //                 const docRefEng = await addDoc(collection(db, "test-questions"), engData);
    //                 console.log("Document Eng written with ID: ", docRefEng.id);

    //                 const docRefPunj = await addDoc(collection(db, "test-questions"), punjData);
    //                 console.log("Document Punj written with ID: ", docRefPunj.id);

    //             } catch (e) {
    //                 console.error("Error adding document: ", e);
    //             }
    //         };

    //         await uploadData(data);

    //         // try {

    //         //     console.log("heyy");

    //         //     const testImageData = ref(storage, `test-images/${data.id}`)
    //         //     await uploadBytes(testImageData, e.target.img.files[0]).then((snapshot) => {
    //         //         console.log(snapshot)
    //         //         getDownloadURL(snapshot.ref).then(async (doc_URL) => {
    //         //             console.log(doc_URL)
    //         //             data.img = doc_URL;
    //         //             // await uploadData(data);
    //         //         })
    //         //     }).catch((er) => {
    //         //         window.alert("Couldn't upload Image")
    //         //         console.log(er);
    //         //     })

    //         //     console.log("uploading Image");
    //         // } catch (e) {
    //         //     console.error("Error uploading Image: ", e);
    //         //     setError('Failed to upload Image');
    //         // }

    //         // setLoading(false);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // for (let i = 0; i < 25; i++) {
    //     const data = {
    //         content_eng: 'ENG_QUES' + i,
    //         content_punj: 'PUNJ_QUES' + i,
    //         option1_eng: 'ENG_OPT1' + i,
    //         option1_punj: 'PUNJ_OPT1' + i,
    //         option2_eng: 'ENG_OPT2' + i,
    //         option2_punj: 'PUNJ_OPT2' + i,
    //         option3_eng: 'ENG_OPT3' + i,
    //         option3_punj: 'PUNJ_OPT3' + i,
    //         option4_eng: 'ENG_OPT4' + i,
    //         option4_punj: 'PUNJ_OPT4' + i,
    //         correct_option: i%4,
    //         img: '',
    //     }

    //     add_ques(data);
    // }
  }
  function handlePrevQuestion() {
    // if (QuestionId > 0) {
    //     setQuestionId((QuestionId) => QuestionId - 1);
    // }
    if (questionCounter > 0) {
      setQuestionCounter((questionCounter) => questionCounter - 1);
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
    console.log(answers);
    // console.log(answers[0]);
    console.log(questions);
    console.log(questions_eng);
    // console.log(questions[0])
    console.log(randomQuestions);

    // calculate score
    for (let i = 0; i < randomQuestions.length; i++) {
      try {
        console.log(i);

        // console.log(questions[randomQuestions[i]].Correct_option);
        console.log(answers[randomQuestions[i]]);
        // search for the question in the questions array
        const correct_option = questions_eng.find(
          (question) => question.QuestionId === randomQuestions[i]
        ).Correct_option;
        // get value of correct option
        const correct_option_value_eng = questions_eng.find(
          (question) => question.QuestionId === randomQuestions[i]
        ).Options[correct_option];
        console.log(correct_option_value_eng);

        const correct_option_value_punj = questions_punj.find(
          (question) => question.QuestionId === randomQuestions[i]
        ).Options[correct_option];
        console.log(correct_option_value_punj);

        // console.log(correct_option);
        // for (let j = 0; j < questions_eng.length; j++) {
        //     if (questions_eng[j].QuestionId === randomQuestions[i]) {
        //         console.log(questions_eng[j].Correct_option);
        //         console.log(questions_eng[j].Correct_option === answers[randomQuestions[i]]);
        //         break;
        //     }
        // }

        // console.log(questions_eng[randomQuestions[i]])
        console.log('-------------');
        if (
          answers[randomQuestions[i]] === correct_option_value_eng ||
          answers[randomQuestions[i]] === correct_option_value_punj
        ) {
          score++;
        }
      } catch (e) {
        continue;
      }
    }

    // console.log(answers[randomQuestions[0]]);
    toast.success(`Score is ${score}`);

    // add score to the database
    const add_score = async (data_fetch) => {
      try {
        console.log(data_fetch);
        console.log(currentUser.email);

        // setOpen(false);

        // setError('');
        // setLoading(true);

        // data.id = uuidv4();

        // tkae data from form and upload it to firebase
        // const uploadData = async (data) => {
        //     try {
        //         const docRef = await addDoc(collection(db, "test-scores"), data);
        //         console.log("Document written with ID: ", docRef.id);
        //     } catch (e) {
        //         console.error("Error adding document: ", e);
        //     }
        // };

        const updateID = async () => {
          const querySnapshot = await getDocs(
            query(collection(db, 'test-results'), where('email', '==', currentUser.email) && where('Course','==','HMV'))
          );
          const documentReference = querySnapshot.docs[0].ref;
          const existingData = (await getDoc(documentReference)).data();
          
          let scores=existingData.Score;
          scores.push(score);
          let times=new Date();
          scores.push(times);
          try{
            await updateDoc(documentReference, {
              Score: scores
            })
            console.log("documentupdated")
            await navigated();
          }catch(error){
            console.error("Error updating document:", error);
          }
          // const q = query(
          //   collection(db, 'test-results'),
          //   where('email', '==', currentUser.email) && where('Course','==','HMV')
          // );
          // await getDocs(q).then(async (response) => {
          //   let data = response.docs.map((ele) => ({ ...ele.data() }));
          //   console.log(data);
          //   const ref = doc(db, 'test-results', data.email);
          //   let scores=response.docs[0].Score;
          //   scores.push(data_fetch.score);
          //   let times=new Date().getTime();
          //   scores.push(times);
          //   await updateDoc(ref, {
          //     Score: scores,
          //   });
          // });
        };

        await updateID();
        // await uploadData(data);

        // setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };


    add_score({
      score: score,
    });
    
    // console.log(data_user.id);

    // get the current user id
    // const data = {
    //     score: score,
    //     id:

    // redirect to the home page
    
  }
  function navigated(){
    navigate('/candidate-result');
  }

  return (
    <>
      {loading ? (
        <>
        <Spinner/>
        </>
      ):(
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
              selected={language}
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
            data={
              language === 'English'
                ? questions_eng[questionCounter]
                : questions_punj[questionCounter]
            }
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
    </div>)};
    </>
  );
};

export default CandidateTest;
