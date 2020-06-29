import React from 'react';

var Icon = require('react-fontawesome')

class FieldEditable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            icon: "pen",
            title: null,
            value: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            edit: false,
            icon: "pen",
            title: this.props.title,
            value: this.props.value
        })
    }

    edit = () => {
        this.setState({
            edit: !this.state.edit,
            icon: this.state.icon === "pen" ? "check" : "pen",
        })
        if (this.state.edit) {
            //save
        }
    }

    handleChangeValue = (elem) => {
        this.setState({value: elem.target.value})
    }

    render() {

        return(
            <div>
                <div>
                    <p className="subtitle">{this.state.title}</p>
                    {!this.state.edit ? <p className="field">{this.state.value}</p> :
                    <input type="text" className="inputField" value={this.state.value} onChange={this.handleChangeValue} />}
                </div>
                <div>
                    {this.state.edit ? <Icon className="editField" name="times" onClick={this.componentDidMount} /> : null }
                    <Icon className="editField" name={this.state.icon} onClick={this.edit} />
                </div>
            </div>
        );
    }
}

export default FieldEditable;
