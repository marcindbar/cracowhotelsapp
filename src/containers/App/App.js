import React, {Component} from 'react'
import './App.css'

import CityMap from '../../components/CityMap'
import SearchEngine from '../../components/SearchEngine'
import Locations from '../../components/ListLocation'
import MenuButton from '../../components/MenuButton/MenuButton'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import {API_URL} from '../../settings/constanstants'

class App extends Component {
    allMarkers = []
    state = {
        locationsFiltered: [],
        locations: [],
        showInfoWindow: false,
        clickedMarker: {},
        selectedPlace: {},
        menuOpen: true,
        animation: 0,
        error: false,
        searchQuery: '',
    }

    componentDidMount() {
        fetch(API_URL)
            .then((response) => response.json())
            .then((response) => {
                const apiResponse = response.response.groups[0].items
                this.setState({
                    locations: apiResponse,
                    locationsFiltered: apiResponse,
                })
            })
            .catch((error) => {
                console.log(error)
                this.setState({error: true})
            })

        // google maps - handle errors
        window.gm_authFailure = () => this.setState({error: true})
        if (window.google === undefined) {
            this.setState({error: true})
        }
    }

    addMarker = (marker) => {
        if (marker) {
            this.allMarkers.push(marker)
        }
    }

    onClickMap = () => {
        this.setState({
            animation: 0,
            showInfoWindow: false,
        })
    }

    onClickListEl = (e) => {
        const clicked = this.allMarkers.filter((el) => el.marker.name === e.target.textContent)
        this.setState({
            clickedMarker: clicked[0].marker,
            animation: 0,
            showInfoWindow: true,
        })
    }

    onCloseInfoWindow = () => {
        this.setState({
            showInfoWindow: false,
            animation: 0,
        })
    }

    onClickMarker = (props, marker) => {
        this.setState({
            clickedMarker: marker,
            selectedPlace: props,
            animation: 1,
            showInfoWindow: true,
        })
    }

    onHotelSearch = (el) => {
        const query = el.target.value
        const locationsFiltered = this.state.locations.filter(
            (item) =>
                item.venue.name.toLowerCase().includes(query.toLowerCase()) ||
                item.venue.categories[0].shortName.toLowerCase().includes(query.toLowerCase())
        )
        this.setState({
            locationsFiltered: locationsFiltered,
            query: query,
            showInfoWindow: false,
            animation: 0,
        })
    }

    // handle the enter pressing
    clickListEl = (el) => {
        if (el.keyCode === 13) {
            el.target.click()
        } else if (this.state.showInfoWindow) {
            this.setState({
                animation: 0,
                showInfoWindow: false,
            })
        }
    }

    citiesMenuToggle = () => this.setState({menuOpen: !this.state.menuOpen})

    render() {
        const header = (
            <header className='header'>
                <MenuButton menuToggle={this.citiesMenuToggle} />
                <h1 className='header-text'>Hotels in Cracow</h1>
            </header>
        )

        const places = this.state.menuOpen && (
            <aside className='sidebar'>
                <SearchEngine query={this.state.searchQuery} onHotelSearch={this.onHotelSearch} />
                <Locations
                    clickListEl={this.clickListEl}
                    locationsFiltered={this.state.locationsFiltered}
                    onClickListEl={this.onClickListEl}
                />
            </aside>
        )

        const mapAndList = (
            <div className='error-modal'>
                {places}
                <div className='map' role='application'>
                    <CityMap
                        appState={this.state}
                        google={window.google}
                        addMarker={this.addMarker}
                        onCloseInfoWindow={this.onCloseInfoWindow}
                        onClickMarker={this.onClickMarker}
                        onClickMap={this.onClickMap}
                    />
                </div>
            </div>
        )

        const footer = (
            <footer className='footer'>
                <p className='copyrights'>
                    Data is retrieved from Foursquare and icons are from Flaticon.
                </p>
            </footer>
        )

        return (
            <div className='App'>
                {header}
                {this.state.error ? <ErrorMessage /> : mapAndList}
                {footer}
            </div>
        )
    }
}

export default App
