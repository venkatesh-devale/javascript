import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import image from '../images/freelancerlogo.png';
import '../css/style.css';
import axios from 'axios';

class Navbar extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        }
    }

    componentWillMount() {
        axios.get('http://localhost:3001/checksession', { withCredentials: true })
        .then( (response) => {
            console.log("In navbar component will mount..."+ response.data.session.username);
            if(response.data.session !== "ERROR") {
                this.setState({
                    isLoggedIn: true
                })
            } else {
                this.setState({
                    isLoggedIn: false
                })
            }
        })
    }
    
    handleLogout() {
        //alert(sessionStorage.getItem('username'));
         localStorage.removeItem('username');
        // 
        axios.post('http://localhost:3001/logout', null, {withCredentials: true})
        .then((response) => {
            console.log(response.data);
            if(response.data.result === "Session destoryed..please login") {
               
               this.props.history.push('/');
            }
            
        })
    }

    render() {
        //console.log(this.props.success);
        let changes = null;
        if(this.state.isLoggedIn === false) {
            changes = (
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item mr-4 "><a className='text-dark' href="/userhome">All Projects</a></li>
                    <li className="nav-item mr-4 "><a className='text-dark' href="/login">Log In</a></li>
                    <li className="nav-item mr-4"><a className='text-dark' href="/signup">Signup</a></li>
                    <li className="nav-item mr-4"><button className=" navbar-btn btn btn-warning"><a className='text-dark' href="/postproject">Post a Project</a></button></li>
                </ul>
            )
        } else {
            changes = (
                <ul className="nav navbar-nav navbar-right">
                    <li className='nav-item mr-4'><Link className='text-dark' to={`/userprofile/${ localStorage.getItem('username') }`}><span className="glyphicon glyphicon-user"></span> My Profile</Link></li>
                    <li className='nav-item mr-4'><a className='text-dark' onClick={this.handleLogout} href="/"><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
                    
                </ul>
            )
        }
        return (
            <div id="nav">
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">
                                <div id='logo'><img src={image} alt='Freelancer logo' /></div>
                            </a>
    
                        </div>
                        {changes}
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
       success: state.login_data
    }
}

export default withRouter(connect(mapStateToProps)(Navbar));