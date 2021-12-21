import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';
import Home from '../views/Home';
import About from '../views/About';
import GetStarted from '../views/GetStarted';
import CreateBaby from '../views/CreateBaby';
import Tasks from '../views/Tasks';
import YourBaby from '../views/YourBaby';
import ClientsBaby from '../views/ClientsBaby';
import CreateTask from '../views/CreateTask';

function Routes({
  user, setUser, babies, setBabies, setSingleBaby
}) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <Home user={user}/>} />
        <Route exact path="/about" component={() => <About user={user}/>} />
        <PrivateRoute exact path="/add-baby" component={() => <CreateBaby user={user} setUser={setUser} setSingleBaby={setSingleBaby}/>} user={user} setUser={setUser} setSingleBaby={setSingleBaby} />
        <PrivateRoute path="/tasks/:id" component={() => <Tasks user={user} setUser={setUser}/>} user={user} />
        <PrivateRoute exact path="/baby" component={() => <YourBaby user={user} setUser={setUser} babies={babies} setBabies={setBabies} setSingleBaby={setSingleBaby} />} user={user} babies={babies} setSingleBaby={setSingleBaby} />
        <PrivateRoute exact path="/create-task" component={() => <CreateTask user={user} setUser={setUser} babies={babies} setBabies={setBabies} />} user={user} babies={babies} />
        <PrivateRoute exact path="/caregiver-baby" component={() => <ClientsBaby user={user} setUser={setUser} babies={babies} setBabies={setBabies} />} user={user} babies={babies} />
        <PrivateRoute exact path="/get-started/:id" component={() => <GetStarted user={user} setUser={setUser}/>} user={user}/>
      </Switch>
    </div>
  );
}
Routes.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  babies: PropTypes.array,
  setSingleBaby: PropTypes.func,
  setBabies: PropTypes.func
};

export default Routes;
