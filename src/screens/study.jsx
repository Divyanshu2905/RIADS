// import boxicons from 'boxicons';
import { useEffect, useState } from 'react';
import { Map } from '@googlemaps/react-wrapper';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Choose } from '../components/Choose.js';
import { Footer } from '../components/Footer.js';
import { Header } from '../components/Header.js';
import { TOP } from '../components/TOP.js';
import { db } from '../firebase';

export default function Study() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const subscriber = db
      .collection('study')
      .get()
      .then((querySnapshot) => {
        const InfoisList = [];
        querySnapshot.forEach((documentSnapshot) => {
          InfoisList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setInfo(InfoisList);
        // setLoading(false);
      });
  }, []);

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
                Study Material
              </div>
              <div className='font-bolder text-center text-[1.2vw] text-white'>
                <Link to='/' className='text-white'>
                  Home
                </Link>{' '}
                /{' '}
                <Link to='/study' className='text-white'>
                  Study Material
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
            <h4>Study Material</h4>
            {/* <p><a href="#">Study Material 1</a></p> */}
            {info.map((item) => (
              <p>
                <a
                  href={item.upload_documents}
                  target='_blank'
                  rel='noreferrer'
                >
                  {item.title}
                </a>
              </p>
            ))}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
