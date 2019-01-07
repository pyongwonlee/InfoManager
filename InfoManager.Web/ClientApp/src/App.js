import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/Home/HomePage';
import AboutPage from './components/About/AboutPage';
import CategoryList from './components/Credential/Categories/CategoryList';
import NewCategory from './components/Credential/Categories/NewCategory';
import DirectorList from './components/Film/Directors/DirectorList';
import Login from './components/secure/Login';
import Logout from './components/secure/Logout';
import PageNotFound from './components/errors/PageNotFound';

const App = (props)=> (
  <div className="App">
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/about' component={AboutPage} />
          <Route exact path='/category' component={CategoryList} />
          <Route path='/category/create' component={NewCategory} />
          <Route exact path='/director' component={DirectorList} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route component={PageNotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </div>
);

export default App;