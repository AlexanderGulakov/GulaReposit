import React, { Component } from 'react';
import { connect } from 'react-redux'
class UserInfo extends Component{
    render(){
        if(!this.props.user){
            return(<p>Choose user</p>)
        }
        return(
            <div>
                <h2>{this.props.user.name}</h2>
                <p>{this.props.user.mail}</p>
                <p>age:{this.props.user.age}</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.activeUser
    }
}

export default connect (mapStateToProps)(UserInfo);