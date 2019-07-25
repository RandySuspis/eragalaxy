import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PropTypes from "prop-types";

class GoogleMaps extends Component {
    state = {
        selectedPlace: {},
        activeMarker: {},
        showingInfoWindow: false
    }

    onMarkerClick = (props, marker) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    static propTypes = {
        google: PropTypes.object.isRequired,
        zoom: PropTypes.number,
        centerLat: PropTypes.string.isRequired,
        centerLng: PropTypes.string.isRequired,
        styles: PropTypes.string,
        otherLocation: PropTypes.array,
        onMarkerClick: PropTypes.func,
    }

    static defaultProps = {
        zoom: 14,
        styles: require("./GoogleMapStyles.json")
    }

    render() {
        return(
            <Map google={this.props.google}
            zoom={this.props.zoom}
            styles={this.props.styles}
            initialCenter={{
                lat:this.props.centerLat,
                lng:this.props.centerLng
            }}
            center={{
                lat:this.props.centerLat,
                lng:this.props.centerLng
            }}>
                <Marker onClick={this.onMarkerClick}
                    name={'Current location'}
                />

                {this.props.otherLocation.map((data) => (
                    <Marker onClick={this.onMarkerClick}
                        name={data.name}
                        position={{lat: data.lat, lng: data.lng}}
                    />
                ))}

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <p>{this.state.selectedPlace.name}</p>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCscymp_ef8JBSfCvQTS9I3lleT2oELRTc")
})(GoogleMaps)