import React, { Component } from 'react';
import './App.css';

import MainMap from './components/MainMap';
import SearchEngine from './components/SearchEngine';
import Locations from './components/ListLocation';
import Button from './components/Button';
import ErrorMessage from './components/ErrorMessage';


class App extends Component {

  allMarkers = [];
  state = {
    locationsFiltered: [],
    locations: [],
    showInfoWindow: false,
    clickedMarker: {},
    selectedPlace: {},
    menuOpen: true,
    animation: 0,
    error: false,
    query: ''
  };

  componentDidMount() {

    fetch(
      'https://api.foursquare.com/v2/venues/explore?ll=50.061703,19.937394&categoryId=4bf58dd8d48988d1fa931735&checkin=intent&radius=6000&limit=120&client_id=U0GLS0ZVSGFMQD1YFNPWO054PKPNCDNUY1XT13XG1TNXKQZK&client_secret=ABOKXZIF3ZB3T2TXXSO1VENGN1Z2LVLERFWDE4RSQF0MWVXZ&v=20180819'
    ).then(response => response.json())
     .then(response => {
        const apiResponse = response.response.groups[0].items;
        this.setState({
          locations: apiResponse,
          locationsFiltered: apiResponse
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });

    // google maps - handle errors
    window.gm_authFailure = () => this.setState({ error: true });
    if (window.google === undefined) { this.setState({ error: true }); }
  }

  addMarker = marker => {
    if (marker) {this.allMarkers.push(marker);}
  };

  onClickMap = () => {
    this.setState({
      animation: 0,
      showInfoWindow: false
    });
  };

  onClickListEl = e => {
    const clicked = this.allMarkers.filter(el => el.marker.name === e.target.textContent);
    this.setState({
      clickedMarker: clicked[0].marker,
      animation: 0,
      showInfoWindow: true
    });
  };

  onCloseInfoWindow = () => {
    this.setState({
      showInfoWindow: false,
      animation: 0
    });
  };

  onClickMarker = (props, marker) => {
    this.setState({
      clickedMarker: marker,
      selectedPlace: props,
      animation: 1,
      showInfoWindow: true
    });
  };

  onHotelSearch = el => {
    const query = el.target.value;
    const locationsFiltered = this.state.locations.filter(
      item =>
        item.venue.name.toLowerCase().includes(query.toLowerCase()) ||
        item.venue.categories[0].shortName.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({
      locationsFiltered: locationsFiltered,
      query: query,
      showInfoWindow: false,
      animation: 0
    });
  };

  // handle the enter pressing
  clickListEl = el => {
    if (el.keyCode === 13) { el.target.click(); }
    else if (this.state.showInfoWindow) {
      this.setState({ animation: 0, showInfoWindow: false });
    }
  };

  menuToggle = () => {
    if (this.state.menuOpen) { this.setState({ menuOpen: false }); }
    else { this.setState({ menuOpen: true }); }
  };

  render() {
    return (
      <div className='App'>
        <header className='header'>
          <Button menuToggle={this.menuToggle} />
          <h1 className='header-text'>Hotels in Cracow</h1>
        </header>

        {this.state.error ? (
          <ErrorMessage />
          ) : (
            <div className='error-modal'>
              {
                this.state.menuOpen && (
                <aside className='sidebar'>
                  <SearchEngine query={this.state.query}
                    onHotelSearch={this.onHotelSearch} />
                  <Locations clickListEl={this.clickListEl}
                    locationsFiltered={this.state.locationsFiltered}
                    onClickListEl={this.onClickListEl} />
                </aside>)
              }
              <div className='map' role='application'>
                <MainMap appState={this.state}
                  google={window.google}
                  addMarker={this.addMarker}
                  onCloseInfoWindow={this.onCloseInfoWindow}
                  onClickMarker={this.onClickMarker}
                  onClickMap={this.onClickMap} />
              </div>
            </div>
        )}
        <footer className='footer'>
          <p className='copyrights'>Data is retrieved from Foursquare and icons are from Flaticon.</p>
        </footer>
      </div>
    );
  }
}

export default App;
