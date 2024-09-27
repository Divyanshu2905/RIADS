import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons';


export const Header = () => {
  const [show, setShow] = useState(false);
  const { isLogin, isAdmin } = useAuth();
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };
  return (
    <div className='sticky-top'>
      <div className='font-semibold'>
        <Navbar bg='light' expand='lg'>
          <Container fluid>
            <Navbar.Brand href='#'>
              <img
                src='./favicon.ico'
                className='w-20 ml-2 lg:ml-14 md:ml-10'
                alt='RIADS'
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='navbarScroll' />
            <Navbar.Collapse id='navbarScroll'>
              <Nav
                className='me-auto space-x-4 my-2 my-lg-0 justify-content-center'
                navbarScroll
              >
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='/about'>About</Nav.Link>
                <Nav.Link href='/contact'>Contact Us</Nav.Link>
                <Nav.Link href='#'>Success Story</Nav.Link>
                <Nav.Link href='#'>Take Mock Test</Nav.Link>
                <Nav.Link href='/study'>Download Study Material</Nav.Link>
                <NavDropdown
                  title='Our Courses'
                  id='navbarScrollingDropdown'
                  show={show}
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                >
                  <NavDropdown.Item href='#' onMouseLeave={hideDropdown}>
                    Refresher Course on HMV Drivers
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href='/notice'>Notice</Nav.Link>

                {isLogin ?
                  (isAdmin ?
                    (
                      <Link to='/admin-dashboard'>
                        <FontAwesomeIcon icon={faUser} style={{ color: "#c54545", fontSize: "1.5em", marginTop:"10px", marginLeft:"20px" }} />
                      </Link>
                    )
                    :
                    (
                      <Link to='/candidate-viewregistration'>
                        <FontAwesomeIcon icon={faUser} style={{ color: "#c54545", fontSize: "1.5em", marginTop:"10px", marginLeft:"20px" }} />
                      </Link>
                    )
                  )
                  :
                  (
                    <Link to='/login'>
                      <button
                        type='button'
                        className='bg-[#c54545] px-3 py-2 text-white'
                      >
                        Login
                      </button>
                    </Link>
                  )}

                {isLogin ?
                  (
                    <p></p>
                  )
                  :
                  (
                    <Link to='/register'>
                      <button
                        type='button'
                        className='bg-[#c54545] px-3 py-2 text-white'
                      >
                        Register
                      </button>
                    </Link>
                  )}


                {/* <Link to='/candidate-dashboard'>
                  <button
                  type='button'
                  className='bg-[#c54545] px-3 py-2 text-white'
                  >
                  Candidate Panel
                  </button>
                  </Link>
                <Link to='/admin-dashboard'>
                  <button
                    type='button'
                    className='bg-[#c54545] px-3 py-2 text-white'
                  >
                    Admin Panel
                  </button>
                </Link> */}

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
