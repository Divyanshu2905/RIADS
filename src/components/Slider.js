import React from 'react';
import HeroSlider, { Slide } from 'hero-slider';

import img1 from '../images/course.jpg';
// import img2 from '../images/2.jpeg';
// import img3 from '../images/3.jpeg';
// import img4 from '../images/4.jpeg';
// import img5 from '../images/5.jpeg';
// import img6 from '../images/6.jpeg';
// import img7 from '../images/7.jpeg';

export const Slider = () => {
  return (
    <div>
      <HeroSlider
        autoplay={2}
        shouldAutoplay={true}
        autoplayDuration={5}
        shouldDisplayButtons={true}
        slidingAnimation='left_to_right'
        orientation='horizontal'
        initialSlide={1}
        onBeforeChange={(previousSlide, nextSlide) =>
          console.log('onBeforeChange', previousSlide, nextSlide)
        }
        onChange={(nextSlide) => console.log('onChange', nextSlide)}
        onAfterChange={(nextSlide) => console.log('onAfterChange', nextSlide)}
        // settings={{
        //     shouldAutoplay: true,
        //     shouldDisplayButtons: true,
        // }}
        height='25rem'
      >
        <Slide>
          <div
            className='h-screen flex items-center justify-center bg-[#c54545] bg-center'
            style={{
              backgroundImage: `url(${img1})
                `,
              backgroundAttachment: 'fixed',
            }}
          ></div>
        </Slide>
        {/* <Slide>
          <div
            className='h-screen flex items-center justify-center bg-[#c54545] bg-center'
            style={{
              backgroundImage: `url(${img2})
                `,
              backgroundAttachment: 'fixed',
            }}
          ></div>
        </Slide>
        <Slide>
          <div
            className='h-screen flex items-center justify-center bg-[#c54545] bg-center'
            style={{
              backgroundImage: `url(${img3})
                `,
              backgroundAttachment: 'fixed',
            }}
          ></div>
        </Slide>
        <Slide>
          <div
            className='h-screen flex items-center justify-center bg-[#c54545] bg-center'
            style={{
              backgroundImage: `url(${img4})
                `,
              backgroundAttachment: 'fixed',
            }}
          ></div>
        </Slide>
        <Slide>
          <div
            className='h-screen flex items-center justify-center bg-[#c54545] bg-center'
            style={{
              backgroundImage: `url(${img5})
                `,
              backgroundAttachment: 'fixed',
            }}
          ></div>
        </Slide>
        <Slide>
          <div
            className='h-screen flex items-center justify-center bg-[#c54545] bg-center'
            style={{
              backgroundImage: `url(${img6})
                `,
              backgroundAttachment: 'fixed',
            }}
          ></div>
        </Slide>
        <Slide>
          <div
            className='h-screen flex items-center justify-center bg-[#c54545] bg-center'
            style={{
              backgroundImage: `url(${img7})
                `,
              backgroundAttachment: 'fixed',
            }}
          ></div>
        </Slide> */}
      </HeroSlider>
    </div>
  );
};
