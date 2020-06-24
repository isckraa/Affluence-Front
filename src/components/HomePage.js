import React, { Fragment } from 'react';
import '../assets/style/HomePage.css';
import Maps from './Maps';
import Search from './Search';
import Store from './Store';

class Login extends React.Component {

    render() {
        
        return(
            <Fragment>
                <Maps />
                <div className="rightMenu">
                    <Search />
                    <Store />
                </div>
            </Fragment>
        );
    }
}

export default Login;
