import React from 'react';
import '../assets/style/Login.css';
import Backgound from '../images/login_background.jpg';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            token: "",
            responseRequest: {
                status: 0,
                message: ""
            }
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    send = () => {
        let nextState = {
            "username": this.state.username,
            "password": this.state.password
        };
        let self = this;
        fetch('https://projet-web-training.ovh/affluence/Affluence/public/api/login_check', {
            method: 'POST',
            body: JSON.stringify(nextState),
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        }).then((response) => {
            response.json().then((response) => {
                console.log(response);
                this.setState({
                    token: response.token,
                    responseRequest :{
                        status: response.code,
                        message: response.message,
                    }
                })
                console.log(this.state);
            })
        }).catch(err => {
            console.error(err)
        })
    };

    onChangeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    checkConnection() {
        let currentComponentResponse = this.state.responseRequest;
        if(currentComponentResponse.status === 401) {
            return(
                <div className="form-error error-message">
                    <h3>{currentComponentResponse.message}</h3>
                </div>
            )
        }
        if(this.state.token !== "" && this.state.token !== null ){
            return(
                <div className="form-error error-message">
                    <h3>Vous êtes connecté.</h3>
                </div>
            )
        }
    }


    render() {
        return(
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 1 }}
            >
                <div className="login-content" style={{background: `url(${Backgound}) center center / cover no-repeat`}}>
                    <form className="login-form" method="POST">
                        <h1 className="title">Affluence</h1>
                        <div className="inputs">
                            <div className="username-section input-section">
                                <input type="text" name="username" className="input" autoComplete="off" required onChange={this.onChangeUsername} />
                                <label forhtml="username" className="label-name">
                                    <span className="content-name">Utilisateur</span>
                                </label>
                            </div>
                            <div className="password-section input-section">
                                <input type="password" name="password" className="input" required onChange={this.onChangePassword} />
                                <label forhtml="password" className="label-name">
                                    <span className="content-name">Mot de passe</span>
                                </label>
                            </div>
                        </div>
                        <div className="login-form__submit-wrapper">
                            <div className="login-form__button cta" onClick={this.send}>Se Connecter</div>
                            <Link to="/affluence/register">
                                <div className="login-form__button cta">Créer un compte</div>
                            </Link>
                        </div>
                        <div className="login-form__home">
                            <Link to="/affluence/">
                                <div className="login-form__button cta">Accueil</div>
                            </Link>
                            {this.checkConnection()}
                        </div>
                    </form>
                </div>
            </motion.div>
        );
    }
}

export default Login;
