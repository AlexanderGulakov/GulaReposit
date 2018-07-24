import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Button from '../HTMLComponents/Button';
import InputWithLabel from '../HTMLComponents/InputWithLabel';
import {editUser} from '../../actions/app'

class EditUserProfile extends Component {
    state = {
        mail: this.props.currentUser.email,
        password: this.props.currentUser.password,
        name: this.props.currentUser.name,
        id: this.props.currentUser._id,
        age: this.props.currentUser.age,
        country: this.props.currentUser.country
    };

    editUser = () => {
        const {mail, password, name, id, age, country} = this.state;
        const {editUser} = this.props;
        const currentUser = this.props.currentUser;

        editUser({id, name, mail, password, age, country, currentUser});
    };

    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const {mail, password, name, id, age, country} = this.state;
//update server route -> action fetch -> in mongo save img url
        return (
            <Fragment>
                <p>{name}</p>

                <InputWithLabel label="Name" title="Change username" value={name}
                                onInputChange={(value) => {
                                    this.onInputChange(value, 'name')
                                }}/>
                <InputWithLabel label="Email" title="Change email" value={mail}
                                onInputChange={(value) => {
                                    this.onInputChange(value, 'email')
                                }}/>

                <InputWithLabel label="Age" title="Change age" value={age}
                                onInputChange={(value) => {
                                    this.onInputChange(value, 'age')
                                }}/>

                <InputWithLabel label="Country" title="Change country" value={country}
                                onInputChange={(value) => {
                                    this.onInputChange(value, 'country')
                                }}/>

                <InputWithLabel title="Change email" value={mail}
                                onInputChange={(value) => {
                                    this.onInputChange(value, 'email')
                                }}/>

                <InputWithLabel title="Change password" value={password}
                                type="password"
                                onInputChange={(value) => {
                                    this.onInputChange(value, 'pass')
                                }}/>
                <Button title="Update profile data" className="btn btn-danger"
                        onClick={this.editUser}/>
            </Fragment>);
    }
}

function mapStoreToProps(store) {
    return {
        currentUser: store.users.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        editUser
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(EditUserProfile);