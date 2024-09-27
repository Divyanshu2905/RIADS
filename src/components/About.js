import React from 'react';

import img from '../images/about.jpg';

export const About = () => {
  return (
    <div className='ptb-30 bg-gray-100'>
      <div className='container py-5 '>
        <div className='row align-items-center'>
          <div className='col-md-5'>
            <div className=''>
              <img
                src={img}
                alt='Rupnagar Institute of Automotive &amp; Driving Skills'
              />
            </div>
          </div>
          <div className='col-md-7'>
            <div className=''>
              <div className='section-title'>
                <span className='font-bold text-[#c54545]'>
                  About Our Company
                </span>
                <h2 className='font-bold'>
                  Rupnagar Institute of Automotive &amp; Driving Skills
                </h2>
              </div>
              <div className=''>
                <p className='font-light'>
                  With the sincere efforts, far-sighted vision and progressive
                  mission of Sh Bhagwant Mann – the worthy Chief Minister of
                  Punjab; “RUPNAGAR INSTITUTE OF AUTOMOTIVE &amp; DRIVING
                  SKILLS, RUPNAGAR”, A joint venture of the Punjab Government
                  and Red Cross Rupnagar has been established by “Rupnagar
                  Automotive &amp; Driving Skills Society” with the aims to
                  upgrade the skills of the youth, start various courses in
                  driving, automotive and other related fields.
                </p>
                <p className='font-light'>
                  District Red Cross Society Rupnagar, under the visionary
                  leadership of Preeti Yadav IAS, is serving the needy and the
                  downtrodden. Red Cross is already working on many social
                  welfare projects like free dialysis facility for the indige.
                </p>
                <a href='/'>
                  <button
                    type='button'
                    className='bg-[#c54545] px-3 py-2 text-white'
                  >
                    Read More
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
