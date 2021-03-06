import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  SERVER_ERROR,
} from './types';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    if (err.response.status === 500) {
      setAlert(err.response.data, 'danger');
      dispatch({ type: SERVER_ERROR });
    } else {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });

    // Immediately load user
    dispatch(loadUser());
  } catch (err) {
    //Fail to  consider the server error, server just a string not a object
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    dispatch({ type: REGISTER_FAIL });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    // Immediately load user
    dispatch(loadUser());
  } catch (err) {
    if (err.response.status === 500) {
      setAlert(err.response.data, 'danger');
    } else {
      const errors = err.response.data.errors;
      if (errors)
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      dispatch({ type: LOGIN_FAIL });
    }
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
