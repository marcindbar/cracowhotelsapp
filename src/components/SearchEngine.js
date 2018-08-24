import React from 'react';


const SearchEngine = props => {
  return (
    <form onSubmit={el => el.preventDefault()} className='search-engine'>
      <input required
        type='text'
        id='input-id'
        className='input-search'
        onChange={props.onHotelSearch}
        value={props.query} />
      <label className='label-search' htmlFor='input-id'>
        Search hotel
      </label>
    </form>
  );
};

export default SearchEngine;
