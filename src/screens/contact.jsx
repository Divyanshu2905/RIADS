import { Map } from '@googlemaps/react-wrapper';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Choose } from '../components/Choose.js';
import { Footer } from '../components/Footer.js';
import { Header } from '../components/Header.js';
import { TOP } from '../components/TOP.js';

// import boxicons from 'boxicons';

export default function Contact() {
  return (
    <>
      <style jsx>{`
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
      <TOP />
      <Header />
      <Carousel controls={false} indicators={false}>
        <Carousel.Item>
          <img className='d-block w-100' src='/bg-about.webp' alt='Slide' />
          <div className='overlay flex items-center justify-center'>
            <div className='grid h-1/3 w-1/4 grid-rows-2 rounded-lg bg-red-500 bg-opacity-60'>
              <div className='text-center text-[2vw] font-extrabold text-white'>
                Contact Us
              </div>
              <div className='font-bolder text-center text-[1.2vw] text-white'>
                <Link to='/' className='text-white'>
                  Home
                </Link>{' '}
                /{' '}
                <Link to='/contact' className='text-white'>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      <Container className='my-5'>
        {/* Some Padding */}
        <Row className='container mx-auto'>
          <Col className='col-lg-4 col-md-6 col-sm-12 center text-center'>
            {/* <Icon icon="bxs:phone" color='#c54545' className='' width="70px" height="70px" 
            style={{
              backgroundColor: '#fff4e5',
              padding: '10px',
              borderRadius: '50%!important',
              textAlign: 'center',
            }}/> */}
            {/* <i class='bx bx-user'></i> */}
            <h4>Contact Number</h4>
            <p>
              {' '}
              <a href='tel:01881221167'>01881221167</a>
            </p>
            <p>
              <a href='tel:9317703065'>9317703065</a>
            </p>
          </Col>
          <Col className='col-lg-4 col-md-6 col-sm-12 center text-center'>
            {/* <i class="bx bxs-location-plus"></i> */}
            <h4>Our Location</h4>
            <p>Govt. I.T.I Nangal Road Ropar,Rupnagar, Punjab - 140001</p>
          </Col>
          <Col className='col-lg-4 col-md-6 col-sm-12 center text-center'>
            {/* <i class="bx bxs-envelope"></i> */}
            <h4>Email ID</h4>
            <p>
              <a href='riads.rupnagar@gmail.com'>riads.rupnagar@gmail.com</a>
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
