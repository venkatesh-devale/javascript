import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../css/style.css';

class Bidnow extends Component {
    constructor() {
        super();
        this.state = {
            bid: '',
            deliveryDays: ''
        }
        
    }

    handleChange = (events) => {
        this.setState({
            [events.target.name]: events.target.value
        })       
    }

    handleBidSubmit = (events) => {
        events.preventDefault();
        if(localStorage.getItem('username') === null) {
            alert('Login First...');
        } else {
            let pid = localStorage.getItem('project_id');
        let uname = localStorage.getItem('username');
        const bid = {
            project_id: pid,
            bid: this.state.bid,
            deliveryDays: this.state.deliveryDays,
            freelancer: uname
        }
        
        this.props.insertBid(bid);
        }
        
        
    }

    handleClick(e){
        if(localStorage.getItem('username') === null) {
            alert('Login First...');
            
        } else {
            localStorage.setItem("project_id", e.target.dataset.id);
        }
        
    }


    render() {
        return(
            <div className="Bidnow">
                <button type="button" data-id = {this.props.id} className="btn btn-secondary" data-toggle="modal" data-target="#exampleModal" onClick = {this.handleClick.bind(this)}>
                    Bid Now
                </button>
               


                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Placing your bid</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.handleBidSubmit.bind(this)}>
                                <div className='form-group'>
                                    Bid(USD):
                                    <input type='text' onChange={this.handleChange} className='form-control' id='txtBid' name='bid' required/>
                                </div>
                                <div className='form-group'>
                                    Deliver in(Days):
                                    <input type='text' onChange={this.handleChange} className='form-control' id='txtDays' name='deliveryDays' required/>
                                </div>
                                <div className='form-group'>
                                    <input type='submit' value='Place Bid' className='form-control btn btn-primary' id='btnSubmitBid' name='submitBid'/>
                                </div>
                                
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        insertBid : (bid) => {
            console.log("In insertBid dispatcher actions", bid);
            axios.post('http://localhost:3001/insertBidAndUpdateNumberOfBids', bid, {withCredentials: true})
            .then((response) => {
                console.log(response.data);
                if(response.data === 'BID INSERTED SUCCESS') {
                    alert('Your bid is placed successfully...');
                    window.location.reload(true);                    
                } else {
                    alert('You can bid only once for one project');
                }
                    
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bidnow);