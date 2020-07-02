import React, { Fragment } from 'react';
import {withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../assets/style/HomePage.css';
import Maps from './Maps';
import Search from './Search';
import Store from './Store';
import LeftMenu from './LeftMenu';
import History from './History';
import Settings from './Settings';
import { motion } from 'framer-motion';

const cookies = new Cookies();

let TokenGenerator = require( 'token-generator' )({
    salt: 'Licence projet web & mobile 2020 Sorbonne université',
    timestampMap: 'aqwzsxedcf',
});

class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            store: null,
            connected: false,
            page: "HOME",
            darkMode: false,
            lastPosUser: null,
        }
        this.map = React.createRef();
    }

    componentDidMount = () => {
        let token;
        cookies.get('token') ? token = cookies.get('token') : token = TokenGenerator.generate();
        cookies.set('token', token, { 
            path: '/',
            maxAge: 20000,
        });
        let self = this;
        setInterval(function(){
            if (window.location.pathname === "/affluence/" || window.location.pathname === "/affluence") {
                let posUser = self.map.current.getUserPosition();

                if (!self.state.lastPosUser) self.setState({lastPosUser: posUser});

                let maxRight = self.state.lastPosUser.long+0.0001282;
                let maxLeft = self.state.lastPosUser.long-0.0001282;
                let maxTop = self.state.lastPosUser.lat+0.0000901;
                let maxBottom = self.state.lastPosUser.lat-0.0000901;

                if (posUser.long > maxRight || posUser.long < maxLeft || posUser.lat > maxTop || posUser.lat < maxBottom) {
                    fetch('https://projet-web-training.ovh/affluence/Affluence/public/info/pushGeo', {
                        method: 'POST',
                        body: JSON.stringify({
                            "latitude": posUser.lat,
                            "longitude": posUser.long,
                            "userId": 1 //TODO get user_id
                        })
                    }).then((response) => {
                        response.json().then((response) => {
                            console.log(response);
                        })
                    }).catch(err => {
                        console.error(err)
                    })
                    self.setState({lastPosUser: posUser});
                }
            }
        },30000)
    }

    setStore = (store) => {
        this.setState({store: store});
        this.map.current.setSelectedStore(store);
    }

    togglePage = (nextPage) => {
        this.setState({page: nextPage});
    }

    toggleDarkMode = () => {
        this.setState({darkMode: !this.state.darkMode});
        this.map.current.toggleDarkMode(!this.state.darkMode);
    }

    render() {
        return(
            <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: 0 }} 
                exit={{ x: "-100%" }} 
                transition={{ duration: 1 }}
            >
                <Fragment>
                    <Maps setStore={this.setStore} ref={this.map} />
                    {(() => {
                        switch(this.state.page) {
                        case "HISTORY":
                            return <History togglePage={this.togglePage} />
                        case "SETTINGS":
                            return <Settings togglePage={this.togglePage} />
                        default:
                            return <LeftMenu connected={this.state.connected} togglePage={this.togglePage} page={this.state.page} toggleDarkMode={this.toggleDarkMode} darkMode={this.state.darkMode} />
                        }
                    })()}
                    <div className="rightMenu">
                        <Search setStore={this.setStore} />
                        {this.state.store ? <Store
                            store={this.state.store}
                            setStore={this.setStore}
                        /> : null}
                    </div>
                </Fragment>
            </motion.div>
        );
    }
}

export default withRouter(HomePage);
