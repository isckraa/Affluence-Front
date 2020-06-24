import React from 'react';
import '../assets/style/Search.css';
import Rowsearch from './RowSearch'; 

var Icon = require('react-fontawesome')

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            result: []
        }
    }

    handleChange = (event) => {
        this.setState({searchValue: event.target.value});
        this.search(event.target.value);
    }

    search = (value) => {
        //TODO request to API to get stores list including value
        //MAX 5 elements in result
    }

    render() {
        
        return(
            <div className="search">
                <div className="searchBox">
                    <input type="text" className="input" placeholder="Rechercher" value={this.state.searchValue} onChange={this.handleChange} />
                    <Icon className="searchBtn" name="search" />
                </div>
                <div>
                {this.state.result.map(function(store, i){
                    return <Rowsearch store={store} key={i} />;
                })}
                </div>
            </div>
        );
    }
}

export default Search;
