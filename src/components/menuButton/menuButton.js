import React from 'react'
import './menuButton.css'


const menuButton = (props) => {
    return (
        <button
            onClick={props.menuToggle}
            type='button'
            className='menu-button'
            aria-label='Toggle Menu'
        />
    )
}

export default menuButton
