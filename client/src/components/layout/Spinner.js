import React from 'react';

// The `spinner` is a string value of the final path
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <img
      src={spinner}
      // style attribute accept a object https://reactjs.org/docs/dom-elements.html
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  );
};

export default Spinner;
