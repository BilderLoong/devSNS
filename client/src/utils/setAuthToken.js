import axios from 'axios';

// Add x-auth-token
const setAuthToken = (token) => {
  if (token) {
    //common mean all request: https://stackoverflow.com/a/45581882/11602758
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
