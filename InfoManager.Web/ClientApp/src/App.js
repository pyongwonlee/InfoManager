import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/Home/HomePage';
import AboutPage from './components/About/AboutPage';
import DirectorList from './components/Film/Director/DirectorList';
import Login from './components/secure/Login';
import Logout from './components/secure/Logout';
import PageNotFound from './components/errors/PageNotFound';

export default () => (
  <div className="App">
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/director' component={DirectorList} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route component={PageNotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </div>
);
