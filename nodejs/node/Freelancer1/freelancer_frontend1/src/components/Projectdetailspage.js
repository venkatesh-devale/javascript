import React, {Component} from 'react';
import Navbar from './Navbar';
import UserNavbar from './UserNavbar';
import axios from 'axios';
import '../css/style.css';
import Bidnow from './Bidnow';
import ListAllBids from './ListAllBids';


class Projectdetailspage extends Component {
    constructor() {
        super();
        this.state = {
            projectId: '',
            title: '',
            description: '',
            skills_required: '',
            employer: '',
            worker: '',
            budgetrange: '',
            number_of_bids: '',
            average : '',
        }
    }

    componentWillMount() {
        // if(localStorage.getItem('username') === null) {
        //     this.props.history.push('/login');
        // } else {
            
        // }
        
        console.log(this.props.match.params.value);
        this.setState({
            projectId: this.props.match.params.value
        }, () => {
            const projectId = {
                projectid: this.state.projectId
            }
            axios.post('http://localhost:3001/getproject', projectId, {withCredentials: true})
            .then( (response) => {
                console.log('In projectdetails Component will mount', response.data);
                this.setState({
                    title: response.data[0].title,
                    description: response.data[0].description,
                    skills_required: response.data[0].skills_required,
                    employer: response.data[0].employer,
                    worker: response.data[0].worker,
                    budgetrange: response.data[0].budgetrange,
                    number_of_bids: response.data[0].number_of_bids,
                    average : response.data[0].average
                }, () => {
                    console.log('In projectdetails Component will mount showing state',this.state.employer);
                })
            })
        })
        
        
    }

    render() {
        let redirect = null;
        if(localStorage.getItem("username") !== null) {
            //redirect = <Redirect to="/login" />
            redirect = <UserNavbar />;
        }
        return(
            <div className="Projectdetailspage">
            <Navbar />
            { redirect }
                <div className='container-fluid'>
                
                    <div id='divProjectDetails'>
                        
                            <h2> { this.state.title } </h2>
                            <hr />
                            <div id = 'div1' >
                                <h4>Project Description</h4>
                                <p>
                                    {this.state.description}
                                </p>
                            </div>
                            <div id = 'div1' >
                                <h4>Skills Required</h4>
                                <p>
                                    {this.state.skills_required}
                                </p>
                            </div>
                            <div id = 'div1' >
                                <h4>Budget Range</h4>
                                <p>
                                    {this.state.budgetrange}
                                </p>
                            </div>
                            <div id = 'div1' >
                                <h4>Bids</h4>
                                <p>
                                    {this.state.number_of_bids}
                                </p>
                            </div>
                            <div id = 'div1' >
                                <h4>Average Bid</h4>
                                <p>
                                    {this.state.average}
                                </p>
                            </div>
                            <div id = 'div1' >
                                <Bidnow id={this.state.projectId}/>
                            </div>
                        
                    </div>
                    
                    <ListAllBids id = { this.state.projectId } owner = { this.state.employer } />
                </div>
                
            </div>
        );
    }
}

export default Projectdetailspage;