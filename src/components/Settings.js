import React from 'react';
import '../assets/style/Settings.css';

var Icon = require('react-fontawesome')

class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            //NOTHING TODO
        }
    }

    backToHome = () => {
        this.props.togglePage("HOME")
    }

    render() {

        return(
            <div className="settings">
                <Icon className="backToHome" name="arrow-left" onClick={this.backToHome} />
                SETTINGS !
            </div>
        );
    }
}

export default Settings;
