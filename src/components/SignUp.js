import React from 'react';
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
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePseudo = this.onChangePseudo.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.signUpUser = this.signUpUser.bind(this);
        this.responseRequest = this.responseRequest.bind(this);
    }

    async signUpUser() {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With' },
            body: JSON.stringify(this.state),
            // mode: 'no-cors',
        };

        fetch('http://www.projet-web-training.ovh/affluence/Affluence/public/user/register', requestOptions)
            .then(function(response) {
                console.log(response);
                if(response.status === 409) {
                    this.setState({dataResponse: 409})
                    console.log(this.state.dataResponse);
                }
            })
            .then(response => response.json())
            .then(data => (data) ? JSON.parse(data) : {})
            .catch(err => { console.log(err) });
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
        this.setState({
            password: event.target.value,
        });
    }

    responseRequest() {
        console.log(this.state.dataResponse);
    }

    render() {
        // console.log(this.state);
        return(
                <div className="signup-content" style={{background: `url(${Backgound}) center center / cover no-repeat`}}>
                    <form className="signup-form" method="POST">
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
                    </form>
                </div>
        );
    }
}

export default SignUp;
