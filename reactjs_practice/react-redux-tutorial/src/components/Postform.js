import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions/postAction';


class Postform extends Component {

    constructor(props) {
        super(props);
        this.state = {
           title: "",
           body: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const post = {
            title: this.state.title,
            body: this.state.body
        }
        this.props.createPost(post);
    }

    

    render() {
        
        return (
            <div>
                <h1>
                    Add Post
                </h1>
               <form onSubmit={this.handleSubmit}>
                   <div>
                       <label>Title</label><br/>
                       <input type="text" name="title" onChange={this.handleChange}/>
                   </div>
                   <br/>
                   <div>
                       <label>Body</label><br/>
                       <textarea name="body" onChange={this.handleChange}/>
                   </div>
                   <br/>
                   <div>
                       <input type="submit" value="Submit" onClick={this.handleSubmit}/>
                   </div>
                   <br/>
                </form>
                <hr />
            </div>
        );
    }
}

Postform.propTypes = {
    createPost: PropTypes.func.isRequired
}

export default connect(null, { createPost })(Postform);