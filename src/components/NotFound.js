import React from 'react';
import '../assets/style/NotFound.css';

class NotFound extends React.Component {
    render() {
        return(
            <div className="notfound-content">
                <h1 className="notfound-title">404</h1>
                <p className="notfound-text">Oops! Something is wrong.</p>
                <a className="notfound-button" href="/affluence/">Go back in initial page, is better.</a>
            </div>
        )
    }
}

export default NotFound;