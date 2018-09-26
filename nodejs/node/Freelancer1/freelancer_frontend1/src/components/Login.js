import React, {Component} from 'react';
import '../css/style.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
//import cookie from 'react-cookies';
import axios from 'axios';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username:"",
            password:"",
            error:""
        }
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
        .then( (response) => {
            console.log("In render login component will mount...", response.data.session.username);
            if(response.data.session !== "ERROR") {
                this.props.history.push('/userhome');
            }
        })
        return(
            <div className="Login"> 
            
            <div id="mainDiv">
            <div className="center">
                    <div>
                         <h1 id = 'h1LoginandSignup'> Login  </h1>
                    </div>
                    <div id="divLoginForm">
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
                            
                        </form>
                    </div>
                </div>
            </div>
       
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        username: state.username,
        password: state.password,
        loginData: state.login_data
    }
}

function mapDispatchToProps(dispatch) {
    return {
     loginUser: (userDetails) => {
         console.log("In Login dispatch",userDetails);
         axios.post('http://localhost:3001/login', userDetails, { withCredentials: true })
             .then((response) => {
                 console.log("After login dispatch", response.data);
             if(response.data === 'ERROR') {
                alert('Error in logging in..check username and password.')
                dispatch({type: 'ERROR',payload : response})
             }
             else {
                console.log("In login...", response.data.session); 
                localStorage.setItem('username', response.data.result);
                dispatch({type: 'LOGIN_SUCCESS',payload : response})
                
             }
               
         });
     }
    }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(Login);