import React, { Fragment } from 'react';
import '../assets/style/HomePage.css';
import Maps from './Maps';
import Search from './Search';
import Store from './Store';

class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            store: null,
        }
    }

    setStore = (store) => {
        this.setState({store: store});
    }

    render() {
        
        return(
            <Fragment>
                <Maps setStore={this.setStore} />
                <div className="rightMenu">
                    <Search />
                    {this.state.store ? <Store store={this.state.store} setStore={this.setStore} /> : null}
                </div>
            </Fragment>
        );
    }
}

export default HomePage;
