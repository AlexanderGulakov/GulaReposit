import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getUsers, getUserInfo, deleteUser } from '../actions/app'

class Users extends Component {
    componentDidMount() {
        const { getUsers } = this.props;

        getUsers();
    }

    deleteUser = (id) => {
        const { deleteUser } = this.props;

        deleteUser(id);
    };

    renderLi = (el, ind) => {
        return (
            <li key={ind} onClick={()=>this.props.getUserInfo(el)}>{el.name}
                <button onClick={() => {
                    this.deleteUser(el._id);
                }}>X
                </button>
            </li>
        );
    };

    render() {
        const { users } = this.props;

        return (
            <ul className="list">
                {users.map(this.renderLi)}
            </ul>
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