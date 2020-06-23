import React, { Fragment } from 'react';
import Maps from './Maps';
import Search from './Search';

class Login extends React.Component {

    render() {
        
        return(
            <Fragment>
                <Maps />
                <Search />
            </Fragment>
        );
    }
}

export default Login;
