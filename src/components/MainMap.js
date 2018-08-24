import React, { Component } from 'react';
import { Map, InfoWindow, Marker } from 'google-maps-react';
import * as icons from '../Icons';

const iconImages = icons.icons[0];

class MainMap extends Component {
  addCategory = () => {
    let hotelCategory = '';
    const chosenLocation = this.props.appState.locationsFiltered.filter(
      el => el.venue.name === this.props.appState.clickedMarker.name
    );

    if (chosenLocation[0]) {
      hotelCategory = chosenLocation[0].venue.categories[0].shortName;
    }
    return hotelCategory;
  };

  addIcon = () => {
    let hotelCategory = this.addCategory().toLowerCase();
    let url = '';
    if (hotelCategory === 'hotel') {url = `url(${iconImages.hotel})`;}
    else if (hotelCategory === 'hostel') {url = `url(${iconImages.hostel})`;}
    else {url = `url(${iconImages.other})`;}

    return url;
  };

  render() {
    const icon = {url: iconImages.marker};

    return (
      <Map onClick={this.props.onClickMap}
        initialCenter={{ lat: 50.0619474, lng: 19.9368564 }}
        google={this.props.google}
        zoom={13}>

        {this.props.appState.locationsFiltered.map(marker => (
          <Marker key={marker.venue.id}
            onClick={this.props.onClickMarker}
            position={{ lat: marker.venue.location.lat, lng: marker.venue.location.lng }}
            name={marker.venue.name}
            ref={this.props.addMarker}
            icon={icon}
            address={marker.venue.location.address}
            animation={
              this.props.appState.clickedMarker.name === marker.venue.name
                ? this.props.appState.animation : null
            } />
        ))}

        <InfoWindow onClose={this.props.onCloseInfoWindow}
          locations={this.props.appState.locationsFiltered}
          visible={this.props.appState.showInfoWindow}
          marker={this.props.appState.clickedMarker} >

          <div className='info-window'>
            <h1 className='info-window-title'>{this.props.appState.clickedMarker.name}</h1>
            <div className='info-window-category'>
               category: { this.addCategory() }
            </div>
            <p className='info-window-icon' style={{ backgroundImage: `${this.addIcon()}` }} />
            address:
            <p className='info-window-details'>
              {this.props.appState.clickedMarker.address
                ? this.props.appState.clickedMarker.address
                : 'Sorry, no address.'}
            </p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default MainMap;
