import React, { Fragment } from 'react';
import '../assets/style/HomePage.css';
import Maps from './Maps';
import Search from './Search';
import Store from './Store';
import LeftMenu from './LeftMenu';
import History from './History';
import Settings from './Settings';
import { motion } from 'framer-motion';

class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            store: null,
            connected: false,
            page: "HOME",
            darkMode: false,
        }
        this.map = React.createRef();
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
                        {this.state.store ? <Store store={this.state.store} setStore={this.setStore} /> : null}
                    </div>
                </Fragment>
            </motion.div>
        );
    }
}

export default HomePage;
