import React from 'react';
import '../assets/style/Settings.css';
import FieldEditable from './FieldEditable';

var Icon = require('react-fontawesome')

class Settings extends React.Component {

    backToHome = () => {
        this.props.togglePage("HOME")
    }

    render() {

        return(
            <div className="settings">
                <Icon className="backToHome" name="arrow-left" onClick={this.backToHome} />
                <h2 className="title">Paramètres</h2>
                <div className="infosUser">
                    <FieldEditable title="Pseudo" value="p.nollet75" />
                    <FieldEditable title="E-mail" value="patrick@mail.fr" />
                    <FieldEditable title="Mot de passe" value="**********" />
                </div>
                {/* TODO if store: add field: name, lat, long, adresse, cp, ville */}
            </div>
        );
    }
}

export default Settings;
