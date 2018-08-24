import React from 'react';
import ListElement from './ListElement';


const Locations = props => {
  return (
    <ul>
      {props.locationsFiltered.map(item => (
        <ListElement key={item.venue.id}
          clickListEl={props.clickListEl}
          onClickListEl={props.onClickListEl}
          name={item.venue.name} />
      ))}
    </ul>
  );
};

export default Locations;