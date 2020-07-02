import React from 'react';
import { Switch } from '@material-ui/core';
import '../assets/style/DebugPosition.css';

var Icon = require('react-fontawesome')

class DebugPosition extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            longNew: null,
            latNew: null,
            manual: false,
        }
    }

    componentWillReceiveProps = (elem) => {
        if (!this.state.manual) {
            this.setState({
                longNew: elem.map.longUser,
                latNew: elem.map.latUser
            });
        }
    }

    toggleLongNew = (event) => {
        this.setState({
            longNew: event.target.value,
            manual: true,
        });
    }

    toggleLatNew = (event) => {
        this.setState({
            latNew: event.target.value,
            manual: true,
        });
    }

    updateUserLocation = (dir) => {
        let lat = this.props.map.latUser;
        let long = this.props.map.longUser;
        if (dir === "LEFT") {
            long -= 0.00001282 ;
        } else if (dir === "RIGHT") {
            long += 0.00001282 ;
        } else if (dir === "UP") {
            lat += 0.00000901;
        } else if (dir === "DOWN") {
            lat -= 0.00000901;
        } else if ("NEW") {
            lat = this.state.latNew;
            long = this.state.longNew;
        }
        lat = this.roundOff(lat,8);
        long = this.roundOff(long,8);
        this.props.updateUserPosition(lat, long);
        this.setState({
            manual: false,
        });
    }

    roundOff(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }      

    render() {
        return(
            <div className="debugPosition">
                {!this.props.autoRefresh ? <div className="form">
                    <input value={this.state.longNew+""} onChange={this.toggleLongNew} />
                    <input value={this.state.latNew+""} onChange={this.toggleLatNew} />
                    <button onClick={() => this.updateUserLocation("NEW")}>Y aller</button>
                </div> : null }
                {!this.props.autoRefresh ? <div className="joystick">
                    <Icon className="moveLeft angle" name="angle-left" onClick={() => this.updateUserLocation("LEFT")} />
                    <Icon className="moveUp angle" name="angle-up" onClick={() => this.updateUserLocation("UP")} />
                    <Icon className="moveDown angle" name="angle-down" onClick={() => this.updateUserLocation("DOWN")} />
                    <Icon className="moveRight angle" name="angle-right" onClick={() => this.updateUserLocation("RIGHT")} />
                </div> : null }
                <div className="switchAllowGps">
                    <p>Localisation via GPS</p>
                    <Switch
                        checked={this.props.autoRefresh}
                        onChange={this.props.toggleAutoRefresh}
                        color="default"
                    />
                </div>
            </div>
        );
    }
}

export default DebugPosition;
