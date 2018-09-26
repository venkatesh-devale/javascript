import React, {Component} from 'react';
import '../css/style.css';
import Navbar from './Navbar';
import UserNavbar from './UserNavbar';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            projects : [],
            freelancerButtonClicked: false
        }
    }

    componentWillMount() {
            console.log('In my Dashboard');
            const userDetails = {
                username: localStorage.getItem('username')
            }
            axios.post('http://localhost:3001/getmypublishedprojects', userDetails, {withCredentials: true})
            .then((response) => {
                console.log(response.data);
                if(response.data === 'ERROR') {
                    let emptyProject = [];
                    //emptyProject.push('No projects to show');
                    this.setState({
                        projects: emptyProject
                    })
                } else {
                    this.setState({
                        projects: response.data
                    })
                }
            })
    }

    handleFreelancerClicked() {
        this.setState({
            freelancerButtonClicked: true
        })
    }

    render() {
        let redirect = null;
        if(localStorage.getItem("username") === null) {
            redirect = <Redirect to="/login" />
        }
        if(this.state.freelancerButtonClicked === true)
            this.props.history.push('/dashboardfreelancer');
        let projectsToShow = [];
        
        if(this.state.projects === []) {
          
        } else {
            projectsToShow = this.state.projects.map(p => {
                var finalDate = null
                if( p.estimated_completion_date !== null) {
                    finalDate = p.estimated_completion_date.slice(0,10);
                }
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
                            <p><Link to={`/userprofile/${ p.worker }`}>{p.worker}</Link></p>
                        </div>
                    </td>
                    <td>
                        <div>
                        <p> { finalDate } </p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <p>{p.number_of_bids}</p>
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
        }
        
        
        return(
            <div className="Dashboard">
            { redirect }
                <Navbar />
                <UserNavbar />
                <div className='divBtnEmployerOrFreelancer'>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={() => this.componentWillMount()} type="button" className="btn btn-secondary">Employer</button>
                        <button type="button" onClick = {()=> this.handleFreelancerClicked()} className="btn btn-secondary">Freelancer</button>
                    </div>
                </div>
                <div className='divDashboardProjectTable'>
                    <table className='table table-hover'>
                       <thead>
                        <tr className='table-secondary'>
                            <th id='projectNameColomn'>Project Name</th>
                            <th id='employerColomn'>Average Bid</th>
                            <th id='numberOfBidsColomn'>Freelancer Name</th>
                            <th id='numberOfBidsColomn'>Estimated Completion Date</th>
                            <th id='numberOfBidsColomn'>Number of Bids</th>
                            <th id='budgetRangeColomn'>Status</th>     
                        </tr>
                       </thead>
                       <tbody>
                            {projectsToShow}
                       </tbody>
                       
                    </table>
               </div>
            </div>
        );
    }
}

export default Dashboard;