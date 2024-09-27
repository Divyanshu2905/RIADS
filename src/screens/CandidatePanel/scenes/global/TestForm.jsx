import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

const TestForm = ({ answers, setAnswers, data }) => {
  const QuestionOptions = data?.Options;
  const QuestionLanguage = data?.Language;
  const QuestionContent = data?.Content;
  const QuestionId = data?.QuestionId;
  const QuestionImgURL = data?.Image;

  function handleOptionChange(optionIndex) {
    // console.log(optionIndex);
    // console.log(QuestionId)
    console.log(answers);
    const newAnswers = { ...answers };
    console.log(newAnswers);
    newAnswers[QuestionId] = QuestionOptions[optionIndex];
    // console.log(newAnswers);
    setAnswers(newAnswers);
    // console.log(newAnswers);
  }

  return (
    <div className='mx-auto w-11/12 md:w-3/4 lg:w-2/3 break-words border-2 border-gray-300 p-4 m-4'>
      <div>
        <b>Question</b> {QuestionId}{' '}
      </div>
      <div>
        <div className='w-full md:w-full lg:w-1/2 mx-auto'>
          {QuestionImgURL && QuestionImgURL != '' ? (
            <img src={QuestionImgURL} alt='image' />
          ) : null}
        </div>
        <div className='whitespace-normal'>
          {QuestionContent && QuestionContent != '' ? (
            <p>{QuestionContent}</p>
          ) : null}
        </div>

        {QuestionOptions?.map((item, optionIndex) => {
          return (
            <div key={nanoid()} className='flex items-center'>
              <input
                value={item}
                checked={answers[QuestionId] === item}
                onChange={() => handleOptionChange(optionIndex)}
                type='radio'
                name={QuestionId + QuestionLanguage}
              />
              <label className='mx-2' htmlFor='options'>
                {item}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestForm;
