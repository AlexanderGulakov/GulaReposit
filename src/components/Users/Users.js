import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Button from '../HTMLComponents/Button'

import {getUsers, getUserInfo, deleteUser} from '../../actions/app'
import UserInfo from './UserInfo'

class Users extends Component {
    componentDidMount() {
        const {getUsers} = this.props;

        getUsers();
    }

    deleteUser = (id) => {
        const {deleteUser} = this.props;

        deleteUser(id);
    };

    renderLi = () => {
        return this.props.users.map((user) => {
            return (
                <li className="list-group-item" key={user._id} onClick={() => this.props.getUserInfo(user)}>{user.name}
                    <Button
                        title="Delete"
                        className="btn btn-outline-dark btn-sm float-right"
                        onClick={() => {
                        this.deleteUser(user._id);
                    }}>
                    </Button>
                </li>
            );
        });
    };

    render() {

        return (
            <div className="container">
                <ol className="list-group list-group-flush">
                    {this.renderLi()}
                </ol>
                <hr/>
                <h3>User info</h3>
                <UserInfo/>
            </div>

        );
    }
}

function mapStoreToProps(store) {
    return {
        users: store.users.items
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUsers,
        getUserInfo,
        deleteUser,
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(Users);