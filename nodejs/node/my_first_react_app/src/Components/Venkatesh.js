import React, { Component } from 'react';


class Venkatesh extends Component {
    constructor() {
        super();
        this.state = {
            name:"Venkatesh"
        }
    }

    handleClick() {
        
        let varName = 'Manasi';
        this.setState(
            {
                name: varName
            }, function() {
                this.props.changeName(this.state.name);
            }
        );

    }

    render() {
        
        return (
            <div>
               <h1>My name is {this.state.name}</h1>
               <button name='name' value='change name' onClick={this.handleClick.bind(this)}></button>
            </div>
        );
    }
}

export default Venkatesh;
