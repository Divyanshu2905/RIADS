import React from 'react';

export const TOP = () => {
  return (
    <div className='bg-[#c54545] text-white font-semibold  text-sm px-3'>
      <div className='row align-items-center'>
        <div
          className='col-sm-4'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ul className='left-info '>
            <li>
              <a
                className='no-underline text-white'
                href='mailto:riads.rupnagar@gmail.com'
              >
                <span>
                  <svg viewBox='0 0 24 24' className='w-4 h-4 inline-block'>
                    <path
                      fill='currentColor'
                      d='M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7l-8 5.334L4 8.7V6.297l8 5.333l8-5.333V8.7z'
                    />
                  </svg>
                  &nbsp; riads.rupnagar@gmail.com
                </span>
              </a>
            </li>
            <li>
              <svg className='w-4 h-4 inline-block' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z'
                />
                <path
                  fill='currentColor'
                  d='M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66c-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a1 1 0 0 0-.086-1.391l-4.064-3.696z'
                />
              </svg>
              &nbsp;
              <a className='no-underline text-white' href='tel:01881221167'>
                <i className='bs bs-phone-call'></i> 01881221167
              </a>
              ,
              <a className='no-underline text-white' href='tel:9317703065'>
                9317703065
              </a>
            </li>
          </ul>
        </div>
        <div className='col-sm-8'>
          <marquee className='font-bold'>
            <b>Rupnagar Institute Of Automotive and Driving Skills</b> In
            Association with District Red Cross Society, Rupnagar
          </marquee>
        </div>
      </div>
    </div>
  );
};
