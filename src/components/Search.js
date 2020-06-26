import React from 'react';
import '../assets/style/Search.css';
import Rowsearch from './RowSearch';
import axios from 'axios';

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
        if (!value || value.length < 3) {
            this.setState({result: []})
            return;
        }
        let self = this;
        axios.get("http://projet-web-training.ovh/affluence/Affluence/public/boutique/list_nom", {
            params: {
              nom: value
            }
          })
          .then(({data}) => (
            self.setState({
                result: data
            })
          ));
    }

    render() {   
        var result = this.state.result.map((store, i) => {
            return (
                <Rowsearch store={store} key={i} setStore={this.props.setStore} />
            );
        });
        
        return(
            <div className="search">
                <div className="searchBox">
                    <input type="text" className="input" placeholder="Rechercher" value={this.state.searchValue} onChange={this.handleChange} />
                    <Icon className="searchBtn" name="search" />
                </div>
                <div>
                {result}
                </div>
            </div>
        );
    }
}

export default Search;
