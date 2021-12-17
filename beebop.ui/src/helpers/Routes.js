import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';
import Home from '../views/Home';
import About from '../views/About';
import GetStarted from '../views/GetStarted';

function Routes({ user, setUser }) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <Home user={user}/>} />
        <Route exact path="/about" component={() => <About user={user}/>} />
        {/* <Route exact path="/get-started" component={() => <GetStarted user={user} setUser={setUser} />} /> */}
        <PrivateRoute exact path="/get-started/:id" component={() => <GetStarted user={user} setUser={setUser}/>} user={user}/>
      </Switch>
    </div>
  );
}
Routes.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};
export default Routes;
