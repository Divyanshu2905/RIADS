import Carousel from 'react-bootstrap/Carousel';

import { Footer } from '../components/Footer.js';
import { Header } from '../components/Header.js';
import { Regis } from '../components/Regis.js';
import { TOP } from '../components/TOP.js';
import Form from '../components/ui/form';

export default function Register() {
  return (
    <>
      <TOP />
      <Header />
      <Carousel controls={false} indicators={false}>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='/bg-about.webp'
            alt='First slide'
          />
        </Carousel.Item>
      </Carousel>
      <Regis />
      <Form update={'false'} />
      <Footer />
    </>
  );
}
