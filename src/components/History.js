import React from 'react';
import '../assets/style/History.css';
import RowHistory from './RowHistory';

var Icon = require('react-fontawesome')

class History extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            element: ["A","A","A","A","A"]
        }
    }

    backToHome = () => {
        this.props.togglePage("HOME")
    }


    render() {

        return(
            <div className="history">
                <Icon className="backToHome" name="arrow-left" onClick={this.backToHome} />
                <h2 className="title">Historique</h2>
                {this.state.element.map(function(elem, i){
                    return <RowHistory element={elem} key={i} />;
                })}
                <h5 className="points"><span>0</span>&nbsp;points</h5>
            </div>
        );
    }
}

export default History;