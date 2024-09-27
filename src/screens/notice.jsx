import { useEffect, useState } from 'react';
import { Map } from '@googlemaps/react-wrapper';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Choose } from '../components/Choose.js';
import { Footer } from '../components/Footer.js';
import { Header } from '../components/Header.js';
import { TOP } from '../components/TOP.js';
import { db } from '../firebase';

// import boxicons from 'boxicons';

export default function Notice() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const subscriber = db
      .collection('notice')
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
                Notice
              </div>
              <div className='font-bolder text-center text-[1.2vw] text-white'>
                <Link to='/' className='text-white'>
                  Home
                </Link>{' '}
                /{' '}
                <Link to='/notice' className='text-white'>
                  Notice
                </Link>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      <Container className='my-5'>
        {/* Some Padding */}
        <Row className='container mx-auto'>
          <Col className='col-lg-6 col-md-6 col-sm-12 center text-center'>
            <h2>
              <b>Notice</b>
            </h2>
            {info.map((item) => (
              <div className='col-lg-12 col-md-12 col-sm-12 center text-center'>
                <div className='col-lg-12 col-md-12 col-sm-12 center text-center'>
                  <a
                    href={item.upload_documents}
                    target='_blank'
                    rel='noreferrer'
                    style={{
                      color: '#0000FF',
                    }}
                  >
                    <h4>{item.title}</h4>
                  </a>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
