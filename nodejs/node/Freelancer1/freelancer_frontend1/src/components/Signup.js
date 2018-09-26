import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import image from '../images/freelancerlogo.png';
import axios from 'axios';

import '../css/style.css';


class Signup extends Component {
    constructor() {
        super();
        this.state = {
            username:"",
            password:"",
            emailid:"",
            radioHireOrEmployer:""
           
        }
    }

    handleChange = (events) => {
        
            this.setState({
                [events.target.name]: events.target.value
            })
            
            
    }
    
    createUser = (events) => {
        events.preventDefault();
        
        console.log(this.state.username + " " + this.state.password);
        const userDetails = {
            username: this.state.username,
            password: this.state.password,
            emailid: this.state.emailid,
            radioHireOrEmployer: this.state.radioHireOrEmployer
        }
        this.props.insertUser(userDetails);
    }

    render() {
        let authRedirect = null;
        if (this.props.signupSuccess === 'SIGNUP_SUCCESS') {
            authRedirect = <Redirect to='/login'/>
        }
    
        return(
            
            <div className="Signup">
            {authRedirect}
            <div id="mainDiv">
            <div className="center">
                    <div>
                        <div id='logo'><img src={image} alt='Freelancer logo' /></div>
                        <h3 id = 'h1LoginandSignup'> SignUp for free today </h3>
                        <hr />
                    </div>
                    <div id="divSignupForm">
                        <form onSubmit={this.createUser.bind(this)}>
                            <div className="form-group">
                                <input type="email" ref="emailid"  onChange={this.handleChange} className="form-control" id="txtEmailId" placeholder="Enter Email" name="emailid" required/>
                            </div>
                            <div className="form-group">
                                <input type="text" ref="username" onChange={this.handleChange} className="form-control" id="txtUserName" placeholder="Enter Username" name="username" required/>
                            </div>
                            <div className="form-group">
                                <input type="password" ref="password" onChange={this.handleChange} className="form-control" id="txtPassword" placeholder="Enter Password" name="password" required/>
                            </div>
                            <div className="form-group">
                                <input type="submit" className="form-control btn btn-primary" id="btnSubmitSignUpForm" value="Create Account" />
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
        emailid: state.emailid,
        radioHireOrEmployer: state.radioHireOrEmployer,
        signupSuccess: state.signup_success
    }
}

function mapDispatchToProps(dispatch) {
   return {
    insertUser: (newUser) => {
        console.log(newUser);
        axios.post('http://localhost:3001/signup', newUser, {withCredentials: true})
            .then((response) => {
            console.log(response);
            dispatch({type: 'SIGNUP_SUCCESS',payload : response})
        });
    }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);