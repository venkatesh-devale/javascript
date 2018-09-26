import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Login extends Component {

    constructor() {
        super();
        this.state = {
            username:"",
            password:"",
            error:""
        }
    }

    componentWillMount() {
        axios.get('http://localhost:3001/checksession', { withCredentials: true })
        .then((response) => {
            console.log('In login...', response.data.session);
            if(response.data.session !== 'ERROR')
                this.props.history.push('/profile');
        })
    }

    handleChange = (events) => {
        this.setState({
                [events.target.name]: events.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        console.log("In Login page.." + this.state.username + " " + this.state.password);
        const userDetails = {
            username : this.state.username,
            password : this.state.password
        }
        console.log(userDetails);
        this.props.loginUser(userDetails);
    }


    render() {
        axios.get('http://localhost:3001/checksession', { withCredentials: true })
        .then((response) => {
            console.log('In login...', response.data.session);
            if(response.data.session !== 'ERROR')
                this.props.history.push('/profile');
        })
        return (
            <div className = 'Login' className="container">
                
                    <div id="mainDiv" className="container">
                    
                            <div>
                                <h1 id = 'h1LoginandSignup'> Login  </h1>
                            </div>
                            <div id="divLoginForm" className = "center">
                                <form onSubmit={this.handleLogin.bind(this)}>
                                    <div className="form-group">
                                        <input type="text" value={this.state.username} onChange={this.handleChange} className="form-control" id="txtUserName" placeholder="Email or Username" ref="uname" name="username" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="txtPassword" placeholder="Enter Password" ref="pass" name="password" required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" className="form-control btn btn-primary" id="btnSubmitSignUpForm" value="Login" />
                                    </div>
                                    <div className="form-group">
                                        <Link to = "/signup" >Signup now</Link>
                                    </div>

                                </form>
                            </div>
                       
                    </div>
            
            
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        login_success: state.login_success
    }
}

function mapDispatchToProps(dispatch) {
    return {
     loginUser: (userDetails) => {
         console.log("In Login dispatch",userDetails);
         axios.post('http://localhost:3001/login', userDetails, { withCredentials: true })
             .then((response) => {
                 console.log("After login dispatch", response.data);
             if(response.data.error === 'ERROR') {
                alert('Error in logging in..check username and password.')
                dispatch({type: 'ERROR',payload : response})
             }
             else {
                 alert('Login Successfull...');
                //localStorage.setItem('username', response.data.result)
                dispatch({type: 'LOGIN_SUCCESS',payload : response})
             }
               
         });
     }
    }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(Login);
