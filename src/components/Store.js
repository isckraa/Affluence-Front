import React, { Fragment } from 'react';
import '../assets/style/Store.css';
import { Switch } from '@material-ui/core';
import axios from 'axios';
import maskImg from '../images/mask.png';
import gelImg from '../images/gel.png';

var Icon = require('react-fontawesome')

class Store extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            edit: false,
        }
    }

    componentWillReceiveProps = (elem) => {
        this.loadData(elem.store.id);
    }

    componentDidMount = () => {
        this.loadData(this.props.store.id);
    }

    loadData = (id) => {
        this.setState({loaded: false, edit: false});
        let self = this;
        axios.get('http://projet-web-training.ovh/affluence/Affluence/public/boutique/list/'+id)
        .then(function (response) {
            self.setState({
                loaded: true,
                edit: false,
                adresse: response.data.adresse,
                codePostal: response.data.codePostal,
                ville: response.data.ville,
                nom: response.data.nom,
                maxClient: response.data.maxClient, 
                people: 0, //After, get the current value
                waitTime: 0, //After, get the current value
                maskRequired:response.data.maskRequired,
                gel: response.data.gel,
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    handleChangeCapacity = (event) => {
        this.setState({maxClient: event.target.value});
    }

    handleChangePeople = (event) => {
        this.setState({people: event.target.value});
    }

    handleMask = () => {
        this.setState({maskRequired: !this.state.maskRequired});
    }

    handleGel = () => {
        this.setState({gel: !this.state.gel});
    }

    edit = () => {
        this.setState({edit: true});
    }

    close = () => {
        this.props.setStore(null);
    }

    cancelEdit = () => {
        this.loadData(this.props.store.id);
    }

    send = () => {
        let nextState = {
            "maxClient": parseInt(this.state.maxClient),
            // "people": this.state.people,
            "gel": this.state.gel,
            "maskRequired": this.state.maskRequired
        }
        let self = this;
        fetch('http://projet-web-training.ovh/affluence/Affluence/public/boutique/update/'+self.props.store.id, {
            method: 'POST',
            body: JSON.stringify(nextState)
        }).then((response) => {
            response.json().then((response) => {
                console.log(response);
                console.log(nextState)
                self.loadData(self.props.store.id);
            })
        }).catch(err => {
          console.error(err)
        })
    }

    render() {
        
        if (!this.state.edit) {
            return(
                <div className="store">
                    <div className="head">
                        <h5>Boutique</h5>
                        <Icon className="backBtn" name="arrow-left" onClick={this.close} />
                    </div>
                    {this.state.loaded ? <Fragment>
                        <div className="storeInfos">
                            <div>
                                <p>{this.state.nom}</p>
                                <p>{this.state.adresse}</p>
                                <p>{this.state.codePostal} {this.state.ville}</p>
                            </div>
                            {/* <img className="storeImg" src="" /> */}
                        </div>
                        <div className="timeWait">
                            <p><span>{this.state.waitTime}</span>min</p>
                            <p>Temps d'attente estimé</p>
                        </div>
                        <div className="rowPeopleCapacity">
                            <div className="people">
                                <p>{this.state.people}</p>
                                <p>Personnes</p>
                            </div>
                            <div className="capacity">
                                <p>{this.state.maxClient}</p>
                                <p>Capacités max.</p>
                            </div>
                        </div>
                        <div className="rowMaskGel">
                            {this.state.maskRequired ? <div className="mask">
                                <img className="maskImg" src={maskImg} alt="Logo masque obligatoire" />
                                <p>Masque obligatoire</p>
                            </div> : null}
                            {this.state.gel ? <div className="gel">
                                <img className="gelImg" src={gelImg} alt="Logo gel hydroalcoolique disponible" />
                                <p>Gel hydroalcoolique disponible</p>
                            </div>: null}
                        </div>
                        <div className="editBtn" onClick={this.edit}>
                            <h5>Suggérer une modification</h5>
                        </div>
                    </Fragment> : null }
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
                            <input type="number" className="numberStoreEdit" value={this.state.maxClient} onChange={this.handleChangeCapacity} />
                        </div>
                        <div className="editPeople">
                            <p>Personnes dans la file d'attente</p>
                            <input type="number" className="peopleStoreEdit" value={this.state.people} onChange={this.handleChangePeople} />
                        </div>
                        <div className="editMask">
                            <p>Masque obligatoire</p>
                            <Switch
                                checked={this.state.maskRequired}
                                onChange={this.handleMask}
                                color="default"
                                name="checkedB"
                            />
                        </div>
                        <div className="editGel">
                            <p>Gel hydroalcoolique disponible</p>
                            <Switch
                                checked={this.state.gel}
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
