import React from 'react';

import img from '../images/course.jpg';

export const Middlehomeone = () => {
  return (
    <div className='ptb-30 bg-gray-200'>
      <div className='pt-3 text-center'>
        <div className='text-center'>
          <h2>Our Courses</h2>
        </div>
        <div className='row'>
          <div className='col-md-8 offset-md-2 mb-5'>
            <a href='/'>
              <img src={img} alt='Our Courses' />
            </a>
            <div className='text-center bg-white'>
              <h3>
                <a href='/' className='no-underline text-black font-bold'>
                  Refresher Course for HMV Drivers{' '}
                </a>
              </h3>
              <p className='font-light'>
                The objective of the course is to develop a fresh cadre of
                high-quality drivers to meet the demand of the transport
                industry and make local youths employable by..
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
