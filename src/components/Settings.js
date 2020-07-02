import React from 'react';
import '../assets/style/Settings.css';
import FieldEditable from './FieldEditable';

var Icon = require('react-fontawesome')

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pseudo : "",
            email: "",
            password: "",
        }
    }

    backToHome = () => {
        this.props.togglePage("HOME")
    }

    checkUserRole() {
        let userRoles = this.props.user.roles;
        let userRolesStr = "";

        if(userRoles.length > 1) {
            userRoles.forEach( (item, index) => {
                if( index + 1 === userRoles.length) {
                    userRolesStr = userRolesStr + " " + item.slice(5);
                } else {
                    userRolesStr = userRolesStr + " " + item.slice(5) + ", ";
                }
            });
        } else {
            userRolesStr = userRolesStr + " " + userRoles[0].slice(5);
        }
        return userRolesStr;
    }

    render() {
        return(
            <div className="settings">
                <div className="title-wrapper">
                    <Icon className="closeMenuBtn" name="chevron-left" onClick={this.backToHome} />
                    <h2 className="title">Paramètres</h2>
                </div>
                {/* <Icon className="backToHome" name="arrow-left" onClick={this.backToHome} /> */}
                <div className="infosUser">
                    <FieldEditable title="Pseudo" value={this.props.user.pseudo} />
                    <FieldEditable title="E-mail" value={this.props.user.email} />
                    <FieldEditable title="Mot de passe" value="**********" />
                    <div className="roleUser">
                        <p className="subtitle">Roles</p>
                        <h5>{this.checkUserRole()}</h5>
                    </div>
                </div>
                <Icon className="closeMenuBtnMobile" name="chevron-up" onClick={this.backToHome} />                
            </div>
        );
    }
}

export default Settings;
