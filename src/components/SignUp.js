import React from 'react';
import '../assets/style/SignUp.css';
import Backgound from '../images/login_background.jpg';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {        
        return(
            <div className="signup-content" style={{background: `url(${Backgound}) center center / cover no-repeat`}}>
                <form className="signup-form" method="POST">
                    <h1 className="title">Affluence</h1>
                    <div className="inputs">
                        <div className="mail-section input-section">
                            <input type="email" name="mail" className="input input-email" autoComplete="off" required/>
                            <label for="mail" class="label-name">
                                <span class="content-name">Email</span>
                            </label>
                        </div>
                        <div className="username-section input-section">
                            <input type="text" name="username" className="input" autoComplete="off" required/>
                            <label for="username" class="label-name">
                                <span class="content-name">Utilisateur</span>
                            </label>
                        </div>
                        <div className="password-section input-section">
                            <input type="password" name="password" class="input" required/>
                            <label for="password" class="label-name">
                                <span class="content-name">Mot de passe</span>
                            </label>
                        </div>
                    </div>
                    <div className="login-form__submit-wrapper">
                        <div className="login-form__button cta">S'inscrire</div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;
