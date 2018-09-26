import React, { Component } from 'react';
import UserItem from './UserItem';

class Users extends Component {
    render() {
        let userlist;
        userlist = this.props.users.map(user => {
            return(
                <UserItem key={user.id} user={user}/>
            );
        });
        return (
            <div>
                <h3> Showing all Users.. </h3>
                {userlist}
            </div>
        );
    }
}

export default Users;
