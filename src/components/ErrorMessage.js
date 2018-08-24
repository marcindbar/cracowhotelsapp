import React from 'react';


const ErrorMessage = () => {
  return (
    <div className='api-failed'>
      <p className='api-failed-message'>
          Sorry, we tried but the data can not be loaded.
      </p>
    </div>
  );
};

export default ErrorMessage;
