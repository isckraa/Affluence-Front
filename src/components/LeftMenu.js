import React from 'react';
import '../assets/style/LeftMenu.css';
import { Link } from 'react-router-dom';
import { Switch } from '@material-ui/core';

import userLogo from '../images/user_icon.png'

var Icon = require('react-fontawesome')

class LeftMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false,
            username: ""
        }
    }

    displayMenu = () => {
        this.setState({displayMenu: !this.state.displayMenu});

        if(localStorage.getItem('user') !== null) {
            let user = JSON.parse(localStorage.getItem('user'));
            if("token" in user && user.token !== "") {
                this.setState({
                    username: user.username,
                })
            }
        }
    }

    goToAccueil = () => {
        if (this.props.page === "HOME") {
            this.setState({displayMenu: false});
        } else {
            this.props.togglePage("HOME");
        }
    }

    goToHistory = () => {
        this.props.togglePage("HISTORY");
    }

    goToSettings = () => {
        this.props.togglePage("SETTINGS");
    }

    logOut = () => {
        this.setState({
            username: "",
        }, () => {
            if(localStorage.getItem('user') !== null && this.state.username === "") {
                localStorage.removeItem('user');
            }
        });
    }

    render() {
        return (
            <div className={this.state.displayMenu ? "leftMenu largeMenu" : "leftMenu"}>
                {!this.state.displayMenu ? <Icon className="menuIcon" name="bars" onClick={this.displayMenu} />:
                <div className="title-wrapper">
                    <Icon className="closeMenuBtn" name="chevron-left" onClick={this.goToAccueil} />
                    <h2 className="title">Affluence</h2>
                </div>}
                {this.state.displayMenu ? <div className="userInfo">
                    <img className="avatar" src={userLogo} alt="votre avatar" />
                    <h2>Bienvenue</h2>
                    { this.state.username === "" ?
                        <div>
                            <Link to="/affluence/login"><div className="btnConnect"><h5>Se connecter</h5></div></Link>
                        </div> 
                        :
                        <div>
                            <h3 className="name">{this.state.username}</h3>
                            <div className="btnConnect" onClick={this.logOut}><h5>Se déconnecter</h5></div>
                        </div>
                    }
                    {/* {this.props.connected ? <h3 className="name">Patrick Nollet</h3> :
                    <Link to="/affluence/login"><div className="btnConnect"><h5>Se connecter</h5></div></Link>} */}
                </div> : null}
                <div className="middleMenu">
                    <div className="rowMenu" onClick={this.goToAccueil}>
                        <Icon className="menuIcon" name="home" />
                        {this.state.displayMenu ? <h5>Accueil</h5> : null}
                    </div>
                    {this.props.connected ? <div className="rowMenu" onClick={this.goToHistory}>
                        <Icon className="menuIcon" name="clipboard-list" />
                        {this.state.displayMenu ? <h5>Historique</h5> : null}
                    </div> : null }
                    <div className="rowMenu" onClick={this.goToSettings}>
                        <Icon className="menuIcon" name="cogs" />
                        {this.state.displayMenu ? <h5>Paramètres</h5> : null}
                    </div>
                </div>
                {this.state.displayMenu ?
                    <div className="setting-wrapper">
                        <div className="darkMode">
                            <p>mode sombre</p>
                            <Switch
                                checked={this.props.darkMode}
                                onChange={this.props.toggleDarkMode}
                                color="default"
                            />
                        </div> 
                        <Icon className="closeMenuBtnMobile" name="chevron-up" onClick={this.goToAccueil} />
                    </div>
                : null}
            </div>
        )
    }
}

export default LeftMenu;