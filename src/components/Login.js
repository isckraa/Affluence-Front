import React, {Fragment} from 'react';
import '../assets/style/Login.css';
import Backgound from '../images/login_background.jpg';

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {        
        return(
            <Fragment>
                <div className="login-content" style={{background: `url(${Backgound}) center center / cover no-repeat`}}>
                    <form className="login-form" method="POST">
                        <h1 className="title">Affluence</h1>
                        <div className="inputs">
                            <div className="username-section input-section">
                                <input type="text" name="username" className="input" autoComplete="off" required ref={(input) => this.input = input}/>
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
                            <div className="login-form__button cta">Se Connecter</div>
                            <div className="login-form__button cta">Créer un compte</div>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default Login;
