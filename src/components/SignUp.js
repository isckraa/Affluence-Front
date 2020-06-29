import React, { Fragment } from 'react';
import '../assets/style/SignUp.css';
import Backgound from '../images/login_background.jpg';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pseudo: "",
            password: "",
            dataResponse: 0,
            validPassword: true
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePseudo = this.onChangePseudo.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.signUpUser = this.signUpUser.bind(this);
    }

    async signUpUser() {
        let currentComponent = this;

        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(this.state)
        };

        if(currentComponent.state.email !== "" || currentComponent.state.pseudo !== "" || currentComponent.state.validPassword) {
            fetch('https://www.projet-web-training.ovh/affluence/Affluence/public/user/register', requestOptions)
                .then(function(response) {
                    console.log(response);
                    if(response.status === 409) {
                        currentComponent.setState({dataResponse: 409});
                        console.log(currentComponent);
                    } else if( response.status === 201) {
                        currentComponent.setState({dataResponse: 201});
                        console.log(currentComponent);
                    }
                })
                .catch(err => { console.log(err) });
        }
    }

    onChangeEmail(event) {
        this.setState({
            email: event.target.value,
        });
    }

    onChangePseudo(event) {
        this.setState({
            pseudo: event.target.value,
        });
    }

    onChangePassword(event) {
        if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(event.target.value)) {
            this.setState({
                password: event.target.value,
                validPassword: true
            });
        } else {
            this.setState({
                validPassword: false
            })
        }
    }

    responseRequest() {        
        if(this.state.dataResponse === 409) {
            if(this.state.email === "") {
                return(
                    <div className="signup-error error-message">
                        <h3>L'email n'est pas renseigné.</h3>
                    </div>
                );
            } else if(this.state.pseudo === "") {
                return(
                    <div className="signup-error error-message">
                        <h3>Le pseudo n'est pas renseigné.</h3>
                    </div>
                );
            } else {
                return(
                    <div className="signup-error error-message">
                        <h3>L'email ou le pseudo est déjà utilisé.</h3>
                    </div>
                );
            }
        }

        if(!this.state.validPassword) {
            return(
                <div className="signup-error error-message">
                    <h3>Le mot de passe n'est pas correctement reseigné.</h3>
                </div>
            );
        }

        if(this.state.dataResponse === 201) {
            return(
                <div className="signup-error error-message">
                    <h3>Vous êtes bien enregisté sur le site.</h3>
                </div>
            );
        }
    }

    render() {
        return(
            <Fragment>
                <div className="signup-content" style={{background: `url(${Backgound}) center center / cover no-repeat`}}>
                    <form className="signup-form">
                        <h1 className="title">Affluence</h1>
                        <div className="inputs">
                            <div className="mail-section input-section">
                                <input type="email" name="mail" className="input input-email" autoComplete="off" required onChange={this.onChangeEmail} />
                                <label htmlFor="mail" className="label-name">
                                    <span className="content-name">Email</span>
                                </label>
                            </div>
                            <div className="username-section input-section">
                                <input type="text" name="username" className="input" autoComplete="off" required onChange={this.onChangePseudo} />
                                <label htmlFor="username" className="label-name">
                                    <span className="content-name">Utilisateur</span>
                                </label>
                            </div>
                            <div className="password-section input-section">
                                <input type="password" name="password" className="input" required onChange={this.onChangePassword} />
                                <label htmlFor="password" className="label-name">
                                    <span className="content-name">Mot de passe</span>
                                </label>
                            </div>
                        </div>
                        <div className="signup-form__submit-wrapper">
                            <Link to="/affluence/login"><div className="signup-form__button cta">Se logger</div></Link>
                            <div className="signup-form__button cta" onClick={this.signUpUser}>S'inscrire</div>
                        </div>
                        {this.responseRequest()}
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default SignUp;
