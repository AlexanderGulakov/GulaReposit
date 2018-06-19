import React, { Component } from 'react';
import { connect } from 'react-redux'
class UserInfo extends Component{
    render(){
        const {activeUser} = this.props;
        if(!activeUser){
            return(<p>Choose user</p>)
        }

        return(
            <div>
                <h2>name:{activeUser.name}</h2>
                <p>mail:{activeUser.mail}</p>
                <p>age:{activeUser.age}</p>
                <p>country:{activeUser.country}</p>
            </div>
        )
    }
}

function mapStoreToProps(store) {
    return {
        activeUser: store.users.activeUser
    }
}

export default connect (mapStoreToProps,null)(UserInfo);