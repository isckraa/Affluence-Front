import React from 'react';
import '../assets/style/RowSearch.css';

var Icon = require('react-fontawesome')

class RowSearch extends React.Component {

    openDetail = (value) => {
        this.props.setStore(this.props.store);
    }

    render() {
        return(
            <div className="rowSearch">
                <div className="infos">
                    <p>{this.props.store.nom}</p>
                    <p>{this.props.store.adresse}</p>
                    <p>{this.props.store.codePostal}&nbsp;{this.props.store.ville}</p>
                </div>
                <Icon className="chevron" name="chevron-right" onClick={this.openDetail} />
            </div>
        );
    }
}

export default RowSearch;
