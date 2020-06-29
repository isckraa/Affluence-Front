import React from 'react';
import '../assets/style/Login.css';
import Backgound from '../images/login_background.jpg';
import { Link } from 'react-router-dom';

class Login extends React.Component {

    render() {        
        return(
            <div className="login-content" style={{background: `url(${Backgound}) center center / cover no-repeat`}}>
                <form className="login-form" method="POST">
                    <h1 className="title">Affluence</h1>
                    <div className="inputs">
                        <div className="username-section input-section">
                            <input type="text" name="username" className="input" autoComplete="off" required  />
                            <label forhtml="username" className="label-name">
                                <span className="content-name">Utilisateur</span>
                            </label>
                        </div>
                        <div className="password-section input-section">
                            <input type="password" name="password" className="input" required />
                            <label forhtml="password" className="label-name">
                                <span className="content-name">Mot de passe</span>
                            </label>
                        </div>
                    </div>
                    <div className="login-form__submit-wrapper">
                        <div className="login-form__button cta">Se Connecter</div>
                        <Link to="/affluence/signup">
                            <div className="login-form__button cta">Créer un compte</div>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
