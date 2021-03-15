import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            {/* Router without path props will always match, so the Alert
            component needed to put outside of the Switch.
            https://reactrouter.com/web/api/Route/path-string-string*/}
            <Alert />

            {/* Switch will match only one of it's children from top to bottom */}
            <Switch>
              <Route exact path='/register'>
                <Register />
              </Route>

              {/* Using Route component props to provide component will cause every time re-render
              the component will unmount then mount instead of just updating the component  */}
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <Route exact path='/login' render={() => <Login />} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
