import React, { Fragment } from 'react';
import '../assets/style/HomePage.css';
import Maps from './Maps';
import Search from './Search';
import Store from './Store';
import LeftMenu from './LeftMenu';
import History from './History';
import Settings from './Settings';

class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            store: null,
            connected: false,
            page: "HOME",
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

    render() {
        return(
            <Fragment>
                <Maps setStore={this.setStore} ref={this.map} />
                {(() => {
                    switch(this.state.page) {
                    case "HISTORY":
                        return <History togglePage={this.togglePage} />
                    case "SETTINGS":
                        return <Settings togglePage={this.togglePage} />
                    default:
                        return <LeftMenu connected={this.state.connected} togglePage={this.togglePage} page={this.state.page} />
                    }
                })()}
                <div className="rightMenu">
                    <Search setStore={this.setStore} />
                    {this.state.store ? <Store store={this.state.store} setStore={this.setStore} /> : null}
                </div>
            </Fragment>
        );
    }
}

export default HomePage;
