import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../assets/style/Maps.css';

import marker_green from '../images/marker_green.png';
import marker_orange from '../images/marker_orange.png';
import marker_red from '../images/marker_red.png';
import marker_purple from '../images/marker_purple.png';
import marker_position from '../images/marker_position.png';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmFsemFjYmRtdCIsImEiOiJja2JpNnRvd2swY2I3Mnpxdm9pbmFpMHZsIn0.DaO5L1gj7hISYKsYQ9wsDg';

class Maps extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allowed: false,
            lng: 2.33,
            lat: 48.86,
            zoom: 17
        };
    }

    loadMap = (position) => {
        if (position) {
            this.setState({ allowed: true });
        } else {
            return;
        }

        let longUser = position.coords.longitude;
        let latUser = position.coords.latitude;

        this.setState({
            longUser: position.coords.longitude,
            latUser: position.coords.latitude,
        });

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/balzacbdmt/ckbjyoxr2036v1inwsm1e4gzw',
            center: [longUser, latUser],
            zoom: this.state.zoom
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        //Adding user gelocation marker on the map
        map.on('load', function() {
            map.loadImage(
                marker_position,
                function(error, image) {
                    if (error) throw error;
                        map.addImage('marker_position', image);
                        map.addSource('user_geolocation', {
                            'type': 'geojson',
                            'data': {
                                'type': 'FeatureCollection',
                                'features': [
                                    {
                                        'type': 'Feature',
                                        'geometry': {
                                            'type': 'Point',
                                            'coordinates': [longUser, latUser]
                                        }
                                    }
                                ]
                            }
                        });
                        map.addLayer({
                            'id': 'user_geolocation_marker',
                            'type': 'symbol',
                            'source': 'user_geolocation',
                            'layout': {
                                'icon-image': 'marker_position',
                                'icon-size': 0.10
                            }
                        });
                    }
                );
        });
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.loadMap);
        }
    }

    render() {
        if (this.state.allowed) {
            return (
                <div>
                    <div>
                        <div className="sidebarStyle" >DEBUG : Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                    </div>
                    <div ref={el => this.mapContainer = el} />
                </div>
            )
        } else {
            return (
                <div>
                    <h5>You need to accept localisation</h5>
                </div>
            )
        }
    }
}

export default Maps;