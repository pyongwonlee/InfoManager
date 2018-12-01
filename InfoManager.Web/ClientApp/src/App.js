import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/Home/HomePage';
import AboutPage from './components/About/AboutPage';
import FetchData from './components/FetchData';

export default () => (
  <Layout>
    <Route exact path='/' component={HomePage} />
    <Route path='/about' component={AboutPage} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
  </Layout>
);
