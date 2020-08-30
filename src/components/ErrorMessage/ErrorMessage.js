import React from 'react'
import './ErrorMessage.css'

const errorMessage = () => {
    return (
        <div className='api-failed'>
            <p className='api-failed-message'>Sorry, we tried but the data can not be loaded.</p>
        </div>
    )
}

export default errorMessage
