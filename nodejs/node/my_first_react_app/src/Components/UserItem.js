import React, { Component } from 'react';

class UserItem extends Component {
    render() {
        return (
            <div className = 'UserItem'>
                <li>{this.props.user.name}</li>
            </div>
        );
    }
}

export default UserItem;
