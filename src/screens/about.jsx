import { Carousel, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Choose } from '../components/Choose.js';
import { Footer } from '../components/Footer.js';
import { Header } from '../components/Header.js';
import { TOP } from '../components/TOP.js';

export default function About() {
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
                About Us
              </div>
              <div className='font-bolder text-center text-[1.2vw] text-white'>
                <Link to='/' className='text-white'>
                  Home
                </Link>{' '}
                /{' '}
                <Link to='/about' className='text-white'>
                  About
                </Link>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      <Container className='my-5'>
        <Row>
          <Col>
            <div className='pt-4 font-bold text-red-500'>About Us</div>
            <h1 className='font-extrabold'>
              Rupnagar Institute of Automotive & Driving Skills
            </h1>
            <p>
              With the sincere efforts, far-sighted vision and progressive
              mission of Sh Bhagwant Mann – the worthy Chief Minister of Punjab;
              “RUPNAGAR INSTITUTE OF AUTOMOTIVE & DRIVING SKILLS, RUPNAGAR”, A
              joint venture of the Punjab Government and Red Cross Rupnagar has
              been established by “Rupnagar Automotive & Driving Skills Society”
              with the aims to upgrade the skills of the youth, start various
              courses in driving, automotive and other related fields.
            </p>
            <p>
              District Red Cross Society Rupnagar, under the visionary
              leadership of Preeti Yadav IAS, is serving the needy and the
              downtrodden. Red Cross is already working on many social welfare
              projects like free dialysis facility for the indigent, fee to poor
              students, social security for helpless old age people, financial
              help to meritorious students pursuing professional education, help
              to poor and needy patients, corrective deformity surgery of poor
              kids, wheelchairs, tricycles, and other aids to physically
              challenged. Red Cross is also working for the empowerment of needy
              women through various vocational and income-generating courses,
              running a physiotherapy center, creche, homeopathic dispensaries,
              and a prestigious Sanjhi Rasoi to feed the needy in this city's of
              beautiful Rupnagar.
            </p>
            <p>
              Red Cross has taken a new leap into another area of road safety.
              Rupnagar Institute of Automotive and Skill driving Society was
              registered under the Societies Registration Act (XXI of 1960) and
              as amended by Punjab Government Act.1957. Institute of Automotive
              and Driving Skills Rupnagar will be a milestone for the candidates
              of the Majha and Doaba region especially. This facility is going
              to be only second in the state of Punjab.
            </p>
            <Link to='/'>
              <button className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600'>
                Contact Us
              </button>
            </Link>
          </Col>
        </Row>
      </Container>
      <Choose />
      <Footer />
    </>
  );
}
