import React from 'react';
import '../assets/style/SignUp.css';
import Backgound from '../images/login_background.jpg';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: ""
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

    }

    signUpUser() {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            mode: 'no-cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Sign Up User' })
        };
        fetch('https://www.projet-web-training.ovh/affluence/Affluence/public/user/register', requestOptions)
            .then(response => response.json())
            .then(data => this.setState(this.state))
            .catch(err => { console.error(err) });
    }

    onChangeEmail(event) {
        this.setState({
            email: event.target.value,
        });
    }

    onChangeUsername(event) {
        this.setState({
            username: event.target.value,
        });
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value,
        });
    }

    render() {
        console.log(this.state);
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
                            <input type="text" name="username" className="input" autoComplete="off" required onChange={this.onChangeUsername} />
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
                    <div className="login-form__submit-wrapper">
                        <div className="login-form__button cta" onClick={this.signUpUser}>S'inscrire</div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;
