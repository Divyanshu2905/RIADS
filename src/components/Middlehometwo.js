import React from 'react';
import OwlCarousel from 'react-owl-carousel';

import img2 from '../images/gallery1.jpeg';
import img1 from '../images/test.jpg';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export const Middlehometwo = () => {
  const options = {
    loop: true,
    center: true,
    items: 1,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 5000,
    smartSpeed: 450,
    nav: true,
    navText: [
      '<span className="nav-button owl-prev inline-block absolute bottom-1/2 left-5" style="padding:10px">Prev</span>',
      '<span className="nav-button owl-next" style="padding:10px">Next</span>',
    ],
  };
  return (
    <>
      <h6 className='text-center text-[#c54545] mb-0 mt-4 font-bold'>
        Feedback or Client Testimonials
      </h6>
      <h2 className='text-center mt-0 font-black'>Clients Says About Us</h2>
      <div>
        <OwlCarousel
          id='customer-testimonoals'
          className='owl-carousel owl-theme'
          {...options}
        >
          {
            <>
              <div className='item flex justify-center'>
                <div className=' w-1/2'>
                  <div className='w-25 mx-auto' max-width={'90px'}>
                    <img className='  rounded-full' src={img1} alt='' />
                  </div>
                  <p className='text-center'>
                    <b className='text-center font-black text-black text-lg '>
                      Luvkush
                    </b>
                    <br />
                    <b className='text-center text-[#c54545] font-normal'>
                      Gurgaon
                    </b>
                  </p>
                  <p className='text-black'>
                    "I had a great experience learning how to drive at Rupnagar
                    Institute of Automotive &amp; Driving Skills. The training
                    was comprehensive and well-structured, and the instructors
                    were friendly and approachable. I really appreciated the
                    individual attention that I received, and I feel like I
                    learned a lot during my time at the institute."
                  </p>
                </div>
              </div>
              <div className='item flex justify-center'>
                <div className='w-1/2'>
                  <div className='w-25 mx-auto'>
                    <img className='rounded-full' src={img1} alt='' />
                  </div>
                  <p className='text-center'>
                    <b className='text-center font-black text-black text-lg '>
                      Nishant Sharma
                    </b>
                    <br />
                    <b className='text-center text-[#c54545] font-normal'>
                      Chandigarh
                    </b>
                  </p>
                  <p className='text-black'>
                    "I was nervous about learning how to drive, but the
                    instructors at Rupnagar Institute of Automotive &amp;
                    Driving Skills were amazing. They were patient, and
                    knowledgeable, and made me feel comfortable behind the
                    wheel. Thanks to their training, I now feel confident and
                    safe while driving on the road."
                  </p>
                </div>
              </div>
              <div className='item flex justify-center'>
                <div className='w-1/2'>
                  <div className='w-25 mx-auto'>
                    <img className='rounded-full' src={img1} alt='' />
                  </div>
                  <p className='text-center'>
                    <b className='text-center font-black text-black text-lg '>
                      Dilawar Pandey
                    </b>
                    <br />
                    <b className='text-center text-[#c54545] font-normal'>
                      New Delhi
                    </b>
                  </p>
                  <p className='text-black'>
                    "I highly recommend Rupnagar Institute of Automotive &amp;
                    Driving Skills to anyone who is looking to learn how to
                    drive. The facilities are top-notch, and the instructors are
                    some of the best in the industry. They really go above and
                    beyond to ensure that their students are fully prepared for
                    the challenges of driving on today's roads."
                  </p>
                </div>
              </div>
            </>
          }
        </OwlCarousel>

        {/* <div>
          <div className='m-4'>
            <div className='container'>
              <div>
                <h2 className='text-center mt-2 font-black'>Our Gallery</h2>
              </div>
              <div className='row mx-auto flex justify-center'>
                <div className='col-lg-4 col-md-6'>
                  <div className=''>
                    <img
                      src={img2}
                      alt='Rupnagar Institute of Automotive &amp; Driving Skills'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};
