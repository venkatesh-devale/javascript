import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    componentWillMount() {
        axios.get('http://localhost:3001/checksession', { withCredentials: true })
        .then((response) => {
            console.log('In profile...', response.data.session);
            if(response.data.session !== 'ERROR') {
                this.setState({
                    username: response.data.session.username
                })
            } else {
                this.props.history.push('/login');
            }
            
        })
    }

    handleLogout = () => {
        
        axios.post('http://localhost:3001/logout', this.state.username, {withCredentials: true})
        .then( (response) => {
            console.log('In handlelogout...', response);
            if(response.data === 'SESSION_DESTROYED') {
                this.props.history.push('/logout');
            }
        })
    }

    render() {
        return (
            <div className = 'Profile'>
                <h1>Hello {this.state.username}</h1>
                <br />
                <br />
                <button className = 'btn btn-primary' onClick = {this.handleLogout}>Logout</button>
            </div>
        );
    }
}

export default withRouter(Profile);
