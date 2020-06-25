import React from 'react';
import '../assets/style/LeftMenu.css';
import { Link } from 'react-router-dom'

import userLogo from '../images/user_icon.png'

var Icon = require('react-fontawesome')

class LeftMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false,
        }
    }

    displayMenu = () => {
        this.setState({displayMenu: !this.state.displayMenu});
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

    render() {
        return (
            <div className={this.state.displayMenu ? "leftMenu largeMenu" : "leftMenu"}>
                {!this.state.displayMenu ? <Icon className="menuIcon" name="bars" onClick={this.displayMenu} />:
                <h2 className="title">Affluence</h2>}
                {this.state.displayMenu ? <div className="userInfo">
                    <img className="avatar" src={userLogo} alt="votre avatar" />
                    <h2>Bienvenue</h2>
                    {this.props.connected ? <h3 className="name">Patrick Nollet</h3> :
                    <Link to="/login"><div className="btnConnect"><h5>Se connecter</h5></div></Link>}
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
            </div>
        )
    }
}

export default LeftMenu;