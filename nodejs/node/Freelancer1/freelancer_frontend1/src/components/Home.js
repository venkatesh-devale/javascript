import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/style.css';
import axios from 'axios';

class Home extends Component {

    

    render() {
        // let redirect = null;
        // if(localStorage.getItem("username") !== null) {
        //     redirect = <Redirect to="/userhome" />
        // }
        axios.get('http://localhost:3001/checksession', { withCredentials: true })
        .then( (response) => {
            console.log("In render home component will mount...", response.data.session.username);
            if(response.data.session !== "ERROR") {
                this.props.history.push('/userhome');
            }
        })
        return(
            <div className="Home">
                <div>
                    <Navbar />
                </div>
                <div id = "divHomePageBottomDiv"></div>
                    <div id = 'h1'>
                        <p className = 'hireExperts'>Hire expert freelancers for any <br/>job, online</p>
                    </div>
                    <div id = 'h1'>
                        <p className = 'hireExperts1'>Millions of small businesses use Freelancer to turn <br/>their ideas into reality.</p>
                    </div>
                    <div id='h2'></div>
                    <div id='h3'></div>

            </div>
        );
    }
}

export default Home;