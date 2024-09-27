import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { About } from './About.js';
import { Choose } from './Choose.js';
import { Footer } from './Footer.js';
import { Header } from './Header.js';
import { Middlehomeone } from './Middlehomeone.js';
import { Middlehometwo } from './Middlehometwo.js';
import { Slider } from './Slider.js';
import { TOP } from './TOP.js';

export const Home = () => {
  return (
    <>
      <TOP />
      <Header />
      {/* <Slider /> */}
      <About />
      <Middlehomeone />
      <Choose />
      <Middlehometwo />
      <Footer />
    </>
  );
};
