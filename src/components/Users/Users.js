import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

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
                <li key={user._id} onClick={() => this.props.getUserInfo(user)}>{user.name}
                    <button onClick={() => {
                        this.deleteUser(user._id);
                    }}>X
                    </button>
                </li>
            );
        });
    };

    render() {

        return (
            <div>
                <ol className="list">
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