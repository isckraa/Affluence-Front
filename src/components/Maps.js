import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../assets/style/Maps.css';
import axios from 'axios';
import DebugPosition from './DebugPosition';

import marker_green from '../images/marker_green.png';
import marker_orange from '../images/marker_orange.png';
import marker_red from '../images/marker_red.png';
import marker_purple from '../images/marker_purple.png';
import marker_position from '../images/marker_position.png';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmFsemFjYmRtdCIsImEiOiJja2JpNnRvd2swY2I3Mnpxdm9pbmFpMHZsIn0.DaO5L1gj7hISYKsYQ9wsDg';

let map = null;

class Maps extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            allowed: true,
            lng: 2.33,
            lat: 48.86,
            zoom: 16,
            idStoreSelected: null,
            autoRefresh: true,
        };
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.loadMap);
            let self = this;
            setInterval(function(){
                if (self.state.autoRefresh) {
                    navigator.geolocation.getCurrentPosition(self.updateUserPosition);
                }
            },5000)
        }
    }

    getUserPosition = () => {
        return {
            long: this.state.longUser,
            lat: this.state.latUser
        }
    }

    setSelectedStore = (store) => {
        //unset selected previous store
        if (this.state.idStoreSelected) {
            if (map.getLayer(this.state.idStoreSelected.toString())) map.removeLayer(this.state.idStoreSelected.toString());
            map.addLayer({
                'id': this.state.idStoreSelected.toString(),
                'type': 'symbol',
                'source': this.state.idStoreSelected.toString(),
                'layout': {
                    'icon-image': 'marker_green',
                    'icon-size': 0.10
                }
            });
        }
        //Toggle color
        if(store) {
            if (map.getLayer(store.id.toString())) map.removeLayer(store.id.toString());
            map.addLayer({
                'id': store.id.toString(),
                'type': 'symbol',
                'source': store.id.toString(),
                'layout': {
                    'icon-image': 'marker_purple',
                    'icon-size': 0.10
                }
            });
            map.flyTo({ center: [store.Longitude, store.Latitude] });
            this.setState({idStoreSelected: store.id.toString()});
        }
    }

    updateUserPosition = (nextLat, nextLong) => {
        if(!nextLong && nextLat.coords.longitude && nextLat.coords.latitude) {
            nextLong = nextLat.coords.longitude;
            nextLat = nextLat.coords.latitude;
        }
        map.getSource('user_geolocation').setData({
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "properties": { "name": "user_geolocation" },
                "geometry": {
                    "type": "Point",
                    "coordinates": [ nextLong, nextLat ]
                }
            }]
        });
        if (!this.state.autoRefresh) {
            map.flyTo({ center: [nextLong,nextLat] });
            this.setState({
                longUser: nextLong,
                latUser: nextLat,
            });
        }
    }
    
    toggleDarkMode = (darkMode) => {
        let layer = 'ckbjyoxr2036v1inwsm1e4gzw';
        if (darkMode) {
            layer = 'ckblm0wn60jlj1ilp0vby1glw';
        }
        map.setStyle('mapbox://styles/balzacbdmt/'+layer);
    }

    toggleAutoRefresh = () => {
        this.setState({autoRefresh: !this.state.autoRefresh});
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
            longUser: longUser,
            latUser: latUser,
        });

        map = new mapboxgl.Map({
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
        axios.get('https://projet-web-training.ovh/affluence/Affluence/public/boutique/list', {
            method: 'GET'
        })
        .then(function (response) {
            response.data.forEach(element => {
                if (element.fileAttente[0]) {
                    axios.get('https://projet-web-training.ovh/affluence/Affluence/public/file/attente/list/'+element.fileAttente[0])
                    .then(function (responseFileAttente) {
                        let duree = new Date(responseFileAttente.data.duree);
                        duree = duree.getHours()*60 + duree.getMinutes();
                        if (duree >= 30) {
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
                                    'icon-image': 'marker_red',
                                    'icon-size': 0.10
                                }
                            });
                        } else if (duree >= 10) {
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
                                    'icon-image': 'marker_orange',
                                    'icon-size': 0.10
                                }
                            });
                        } else {
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
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
                map.on('click', element.id.toString(), function(e) {
                    self.props.setStore(element);
                });
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        if (this.state.allowed) {
            return (
                <div>
                    <div ref={el => this.mapContainer = el} />
                    <DebugPosition
                        updateUserPosition={this.updateUserPosition}
                        map={this.state}
                        autoRefresh={this.state.autoRefresh}
                        toggleAutoRefresh={this.toggleAutoRefresh}
                    />
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