import React from 'react';
import '../assets/style/Store.css';

import maskImg from '../images/mask.png';
import gelImg from '../images/gel.png';

var Icon = require('react-fontawesome')

class Search extends React.Component {

    edit = () => {
        console.log("Edit");
    }

    goBack = () => {
        console.log("Go back");
    }

    render() {
        
        return(
            <div className="store">
                <div className="head">
                    <h5>Boutique</h5>
                    <Icon className="backBtn" name="arrow-left" onClick={this.goBack} />
                </div>
                <div className="storeInfos">
                    <div>
                        <p>H&M</p>
                        <p>17 rue du Louvre</p>
                        <p>75001 Paris</p>
                    </div>
                    <img className="storeImg" src="https://s1.qwant.com/thumbr/0x380/b/4/82af6bcdb4386df28abfdf59cec7ef28a3c8d4c6daf7014828d621efba9bc2/1200px-H%26M-Logo.svg.png?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F5%2F53%2FH%2526M-Logo.svg%2F1200px-H%2526M-Logo.svg.png&q=0&b=1&p=0&a=1" />
                </div>
                <div className="timeWait">
                    <p><span>20</span>min</p>
                    <p>Temps d'attente estimé</p>
                </div>
                <div className="rowPeopleCapacity">
                    <div className="people">
                        <p>28</p>
                        <p>Personnes</p>
                    </div>
                    <div className="capacity">
                        <p>70</p>
                        <p>Capacités max.</p>
                    </div>
                </div>
                <div className="rowMaskGel">
                    <div className="mask">
                        <img className="maskImg" src={maskImg} />
                        <p>Masque obligatoire</p>
                    </div>
                    <div className="gel">
                        <img className="gelImg" src={gelImg} />
                        <p>Gel hydroalcoolique disponible</p>
                    </div>
                </div>
                <div className="editBtn" onClick={this.edit}>
                    <h5>Suggérer une modification</h5>
                </div>
            </div>
        );
    }
}

export default Search;
