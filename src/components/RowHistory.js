import React from 'react';
import '../assets/style/RowHistory.css';

class RowHistory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            displayDetail: false,
            element: ["A", "A", "A"]
        }
    }

    toggleDisplay = () => {
        this.setState({displayDetail: !this.state.displayDetail});
    }

    render() {

        return(
            <div className="rowHistory" onClick={this.toggleDisplay}>
                <div className="retracted">
                    <div>
                        <p>H&M</p>
                        <p>17 rue du Louvre</p>
                        <p>75001 Paris</p>
                    </div>
                    <p className="pointsGlobal">+&nbsp;<span>4</span>&nbsp;points</p>
                </div>
                {this.state.displayDetail ? <div className="details">
                    {this.state.element.map(function(elem, i){
                        return <div>
                            <p>Mise a jour du nombre de personne dans la file d'attente</p>
                            <p className="pointsDetail">+<span>2</span>&nbsp;points</p>
                        </div>;
                    })}                    
                </div> : null }
            </div>
        );
    }
}

export default RowHistory;