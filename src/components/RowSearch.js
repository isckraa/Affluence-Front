import React from 'react';
import '../assets/style/RowSearch.css';

var Icon = require('react-fontawesome')

class RowSearch extends React.Component {

    openDetail = (value) => {
        //TODO open detail of store
    }

    render() {
        //TODO echo value from props
        
        return(
            <div className="rowSearch">
                <img className="img" src="https://s1.qwant.com/thumbr/0x380/b/4/82af6bcdb4386df28abfdf59cec7ef28a3c8d4c6daf7014828d621efba9bc2/1200px-H%26M-Logo.svg.png?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F5%2F53%2FH%2526M-Logo.svg%2F1200px-H%2526M-Logo.svg.png&q=0&b=1&p=0&a=1" />
                <div className="infos">
                    <p>H & M</p>
                    <p>17 rue du Louvre</p>
                    <p>75001 Paris</p>
                </div>
                <Icon className="chevron" name="chevron-right" onClick={this.openDetail} />
            </div>
        );
    }
}

export default RowSearch;
