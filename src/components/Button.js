import React from 'react';


const Button = props => {
  return (
    <button
      onClick={props.menuToggle}
      type='button'
      className='menu-button'
      aria-label='Toggle Menu'
    />
  )
};

export default Button;
