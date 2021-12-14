import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
// import PrivateRoute from './PrivateRoute';
import Home from '../views/Home';

function Routes({ user }) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <Home user={user}/>} />
        <Route exact path="/about" component={() => <Home user={user}/>} />
        {/* <PrivateRoute exact path="/user/:id" component={() => <Profile user={user} setUser={setUser}/>} user={user}/> */}
      </Switch>
    </div>
  );
}
Routes.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func
};
export default Routes;
