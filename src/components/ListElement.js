import React from 'react'

const ListElement = (props) => {
    return (
        <li
            className='list-el'
            onClick={props.onClickListEl}
            onKeyDown={props.clickListEl}
            tabIndex='0'
            aria-label={props.name}
            role='button'
        >
            {props.name}
        </li>
    )
}

export default ListElement
