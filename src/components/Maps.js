import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../assets/style/Maps.css';
import axios from 'axios';

import marker_green from '../images/marker_green.png';
import marker_orange from '../images/marker_orange.png';
import marker_red from '../images/marker_red.png';
import marker_purple from '../images/marker_purple.png';
import marker_position from '../images/marker_position.png';
import { isNull } from 'util';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmFsemFjYmRtdCIsImEiOiJja2JpNnRvd2swY2I3Mnpxdm9pbmFpMHZsIn0.DaO5L1gj7hISYKsYQ9wsDg';

class Maps extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allowed: true,
            lng: 2.33,
            lat: 48.86,
            zoom: 12,
            idStoreSelected: null
        };
    }

    loadMap = (position = null) => {

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
                marker_green,
                function(error, image) {
                    if (error) throw error;
                    map.addImage('marker_green', image);
                }
            )
            map.loadImage(
                marker_orange,
                function(error, image) {
                    if (error) throw error;
                    map.addImage('marker_orange', image);
                }
            )
            map.loadImage(
                marker_red,
                function(error, image) {
                    if (error) throw error;
                    map.addImage('marker_red', image);
                }
            )
            map.loadImage(
                marker_purple,
                function(error, image) {
                    if (error) throw error;
                    map.addImage('marker_purple', image);
                }
            )
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
        
        //Get and display stores on the map
        let self = this;
        axios.get('http://projet-web-training.ovh/affluence/Affluence/public/boutique/list', {
            method: 'GET'
        })
        .then(function (response) {
            response.data.forEach(element => {
                map.addSource(element.id.toString(), {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [element.Longitude, element.Latitude]
                                }
                            }
                        ]
                    }
                });
                map.addLayer({
                    'id': element.id.toString(),
                    'type': 'symbol',
                    'source': element.id.toString(),
                    'layout': {
                        'icon-image': 'marker_green',
                        'icon-size': 0.10
                    }
                });
                map.on('click', element.id.toString(), function(e) {
                    self.props.setStore(element);
                    //unset selected previous store
                    if (self.state.idStoreSelected) {
                        if (map.getLayer(self.state.idStoreSelected.toString())) map.removeLayer(self.state.idStoreSelected.toString());
                        map.addLayer({
                            'id': self.state.idStoreSelected.toString(),
                            'type': 'symbol',
                            'source': self.state.idStoreSelected.toString(),
                            'layout': {
                                'icon-image': 'marker_green',
                                'icon-size': 0.10
                            }
                        });
                    }
                    //Toggle color
                    if (map.getLayer(element.id.toString())) map.removeLayer(element.id.toString());
                    map.addLayer({
                        'id': element.id.toString(),
                        'type': 'symbol',
                        'source': element.id.toString(),
                        'layout': {
                            'icon-image': 'marker_purple',
                            'icon-size': 0.10
                        }
                    });
                    self.setState({idStoreSelected: element.id.toString()})
                });
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount() {
        //DEBUG
        let debug = {
            coords: {
                longitude: "2.3488",
                latitude: "48.8534"
            }
        }
        this.loadMap(debug);
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(this.loadMap);
        // }
    }

    render() {
        if (this.state.allowed) {
            return (
                <div>
                    <div ref={el => this.mapContainer = el} />
                </div>
            )
        } else {
            return (
                <div>
                    <h3>You need to accept localisation</h3>
                </div>
            )
        }
    }
}

export default Maps;