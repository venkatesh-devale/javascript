import React, {Component} from 'react';
import axios from 'axios';

class UserNavbar extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        }
    }

    componentWillMount() {
        axios.get('http://localhost:3001/checksession', { withCredentials: true })
        .then( (response) => {
            console.log("In user navbar component will mount...", response.data.session.username);
            if(response.data.session !== "ERROR") {
                this.setState({
                    isLoggedIn: true
                })
            }
        })
    }

    render() {

        let changes = null;
        if(this.state.isLoggedIn === false) {
            return changes;
        } else {
            return (
                <div id="nav">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <ul className="nav navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard">Dashboard</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/userhome">Home</a>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="nav-item mr-4">
                                    <button className=" navbar-btn btn btn-warning">
                                        <a className='text-dark' href="/postproject">Post a Project
                                        </a>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            );
        }
    }
} 

export default UserNavbar;