import React from 'react';
import '../assets/style/Search.css';
import Rowsearch from './RowSearch';
import axios from 'axios';
import loading from '../images/loading.gif';

var Icon = require('react-fontawesome')

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            result: [],
            searching: false,
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
        this.setState({searching: true});
        let self = this;
        axios.get("https://projet-web-training.ovh/affluence/Affluence/public/boutique/list_nom", {
            params: {
              nom: value
            }
          })
          .then(({data}) => (
            self.setState({
                result: data,
                searching: false,
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
                {this.state.searching ? 
                    <img className="loading" src={loading} alt="Recherche en cours" />
                    :
                    <div>
                        {result}
                    </div>
                }
            </div>
        );
    }
}

export default Search;
