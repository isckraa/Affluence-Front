import React from 'react';
import '../assets/style/DebugPosition.css';

var Icon = require('react-fontawesome')

class DebugPosition extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            longNew: null,
            latNew: null,
        }
    }

    componentWillReceiveProps = (elem) => {
        this.setState({
            longNew: elem.map.longUser,
            latNew: elem.map.latUser
        });
    }

    toggleLongNew = (event) => {
        this.setState({longNew: event.target.value});
    }

    toggleLatNew = (event) => {
        this.setState({latNew: event.target.value});
    }

    updateUserLocation = (dir) => {
        let lat = this.props.map.latUser;
        let long = this.props.map.longUser;
        if (dir === "LEFT") {
            long -= 0.000001;
        } else if (dir === "RIGHT") {
            long += 0.000001;
        } else if (dir === "UP") {
            lat += 0.000001;
        } else if (dir === "DOWN") {
            lat -= 0.000001;
        } else if ("NEW") {
            lat = this.state.latNew;
            long = this.state.longNew;
        }
        lat = this.roundOff(lat,6);
        long = this.roundOff(long,6);
        this.props.updateUserPosition(lat, long);
    }

    roundOff(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }      

    render() {
        return(
            <div className="debugPosition">
                <div className="form">
                    <input value={this.state.longNew} onChange={this.toggleLongNew} />
                    <input value={this.state.latNew} onChange={this.toggleLatNew} />
                    <button onClick={() => this.updateUserLocation("NEW")}>Y aller</button>
                </div>
                <div className="joystick">
                    <Icon className="moveLeft angle" name="angle-left" onClick={() => this.updateUserLocation("LEFT")} />
                    <Icon className="moveUp angle" name="angle-up" onClick={() => this.updateUserLocation("UP")} />
                    <Icon className="moveDown angle" name="angle-down" onClick={() => this.updateUserLocation("DOWN")} />
                    <Icon className="moveRight angle" name="angle-right" onClick={() => this.updateUserLocation("RIGHT")} />
                </div>
            </div>
        );
    }
}

export default DebugPosition;
