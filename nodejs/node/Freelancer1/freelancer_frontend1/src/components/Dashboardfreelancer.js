import React, {Component} from 'react';
import '../css/style.css';
import Navbar from './Navbar';
import UserNavbar from './UserNavbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Dashboardfreelancer extends Component {

    constructor() {
        super();
        this.state = {
            projects : [],
            employerButtonClicked: false
        }
    }

    componentWillMount() {
        
        if(localStorage.getItem("username") === null) {
            this.props.history.push('/login');
        } else {
            console.log('In my Dashboardfreelancer...');
            const userDetails = {
                username: localStorage.getItem('username')
            }
            axios.post('http://localhost:3001/getmybiddedprojects', userDetails, {withCredentials: true})
            .then((response) => {
                console.log('Showing all bidded projects',response.data);
                if(response.data === 'ERROR') {
                    let emptyProject = [];
                    emptyProject.push('No projects to show');
                    this.setState({
                        projects: emptyProject
                    })
                } else {
                    this.setState({
                        projects: response.data
                    }, () => {
                        console.log('All projects you have bidded on to:', this.state.projects);
                    })
                }
            })
        }
            
    }

    handleEmployerClicked() {
        this.setState({
            employerButtonClicked: true
        })
    }

    render() {
        if(this.state.employerButtonClicked === true)
            this.props.history.push('/dashboard');
        let projectsToShow = [];
        projectsToShow = this.state.projects.map(p => {
            return (
                <tr key={p.id}>
                <td>
                    <p><Link to={`/projectdetails/${ p.id }`}> {p.title} </Link></p>
                    <p> {p.description} </p>
                    <span> {p.skills_required} </span>
                </td>
                <td>
                    <div>
                        <p> { p.average } </p>
                    </div>
                </td>
                <td>
                    <div>
                        <p><Link to={`/userprofile/${p.employer}`}> {p.employer} </Link></p>
                    </div>
                </td>
                <td>
                    <div>
                        <p>{p.bidamount}</p>
                    </div>
                </td>
                <td>
                    <div>
                        <p>{p.open}</p>
                    </div>
                </td>
                
             </tr>
            );
            
        });
        return(
            <div className="Dashboardfreelancer">
                <Navbar />
                <UserNavbar />
                <div className='divBtnEmployerOrFreelancer'>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick = {()=> this.handleEmployerClicked()} type="button" className="btn btn-secondary">Employer</button>
                        <button type="button" className="btn btn-secondary">Freelancer</button>
                    </div>
                </div>
                <div className='divDashboardProjectTable'>
                    <table className='table table-hover'>
                       <thead>
                        <tr className='table-secondary'>
                            <th id='projectNameColomn'>Project Name</th>
                            <th id='employerColomn'>Average Bid</th>
                            <th id='numberOfBidsColomn'>Employer Name</th>
                            <th id='numberOfBidsColomn'>Your Bid</th>
                            <th id='budgetRangeColomn'>Status</th>     
                        </tr>
                       </thead>
                       <tbody>
                        { projectsToShow }
                       </tbody>
                       
                    </table>
               </div>
            </div>
        );
    }
}

export default Dashboardfreelancer;