import React from 'react';
import '../assets/style/Store.css';
import { Switch } from '@material-ui/core';

import maskImg from '../images/mask.png';
import gelImg from '../images/gel.png';

var Icon = require('react-fontawesome')

class Store extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            maxClientNew: this.props.store.maxClient, 
            peopleNew: 0, //After, get the current value
            maskRequiredNew: this.props.store.maskRequired,
            gelNew: this.props.store.gel,
        }
    }

    componentWillReceiveProps = (elem) => {
        console.log(elem)
        this.setState({
            edit: false,
            maxClientNew: elem.store.maxClient, 
            peopleNew: 0, //After, get the current value
            maskRequiredNew: elem.store.maskRequired,
            gelNew: elem.store.gel,
        })
    }
    
    handleChangeCapacity = (event) => {
        this.setState({maxClientNew: event.target.value});
    }

    handleChangePeople = (event) => {
        this.setState({peopleNew: event.target.value});
    }

    handleMask = () => {
        this.setState({maskRequiredNew: !this.state.maskRequiredNew});
    }

    handleGel = () => {
        this.setState({gelNew: !this.state.gelNew});
    }

    edit = () => {
        this.setState({
            edit: true,
        });
    }

    close = () => {
        this.props.setStore(null);
        console.log("Go back");
    }


    cancelEdit = () => {
        //Remettre les valeurs des state depuis les props
        this.setState({
            edit: false,
        });
    }

    send = () => {
        //TODO request with new value
        this.setState({
            edit: false,
        });
    }

    render() {
        
        if (!this.state.edit) {
            return(
                <div className="store">
                    <div className="head">
                        <h5>Boutique</h5>
                        <Icon className="backBtn" name="arrow-left" onClick={this.close} />
                    </div>
                    <div className="storeInfos">
                        <div>
                            <p>{this.props.store.nom}</p>
                            <p>{this.props.store.adresse}</p>
                            <p>{this.props.store.codePostal} {this.props.store.ville}</p>
                        </div>
                        {/* <img className="storeImg" src="" /> */}
                    </div>
                    <div className="timeWait">
                        <p><span>0</span>min</p>
                        <p>Temps d'attente estimé</p>
                    </div>
                    <div className="rowPeopleCapacity">
                        <div className="people">
                            <p>0</p>
                            <p>Personnes</p>
                        </div>
                        <div className="capacity">
                            <p>{this.props.store.maxClient}</p>
                            <p>Capacités max.</p>
                        </div>
                    </div>
                    <div className="rowMaskGel">
                        {this.props.store.maskRequired ? <div className="mask">
                            <img className="maskImg" src={maskImg} alt="Logo masque obligatoire" />
                            <p>Masque obligatoire</p>
                        </div> : null}
                        {this.props.store.gel ? <div className="gel">
                            <img className="gelImg" src={gelImg} alt="Logo gel hydroalcoolique disponible" />
                            <p>Gel hydroalcoolique disponible</p>
                        </div>: null}
                    </div>
                    <div className="editBtn" onClick={this.edit}>
                        <h5>Suggérer une modification</h5>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="store">
                    <div className="head">
                        <h5>Boutique</h5>
                        <Icon className="backBtn" name="arrow-left" onClick={this.cancelEdit} />
                    </div>
                    <div className="storeInfos">
                        <div>
                            <p>{this.props.store.nom}</p>
                            <p>{this.props.store.adresse}</p>
                            <p>{this.props.store.codePostal} {this.props.store.ville}</p>
                        </div>
                        {/* <img className="storeImg" src="" /> */}
                    </div>
                    <div className="editContainer">
                        <div className="editCapacity">
                            <p>Capacités maximal</p>
                            <input type="number" className="numberStoreEdit" value={this.state.maxClientNew} onChange={this.handleChangeCapacity} />
                        </div>
                        <div className="editPeople">
                            <p>Personnes dans la file d'attente</p>
                            <input type="number" className="peopleStoreEdit" value={this.state.peopleNew} onChange={this.handleChangePeople} />
                        </div>
                        <div className="editMask">
                            <p>Masque obligatoire</p>
                            <Switch
                                checked={this.state.maskRequiredNew}
                                onChange={this.handleMask}
                                color="default"
                                name="checkedB"
                            />
                        </div>
                        <div className="editGel">
                            <p>Gel hydroalcoolique disponible</p>
                            <Switch
                                checked={this.state.gelNew}
                                onChange={this.handleGel}
                                color="default"
                                name="checkedB"
                            />
                        </div>
                    </div>
                    <div className="editBtn" onClick={this.send}>
                        <h5>Envoyer</h5>
                    </div>
                </div>
            );
        }
        
    }
}

export default Store;
