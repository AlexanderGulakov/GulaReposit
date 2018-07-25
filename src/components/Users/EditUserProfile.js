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
        newPassword:'',
        repeatNewPassword:'',
        name: this.props.currentUser.name,
        _id: this.props.currentUser._id,
        age: this.props.currentUser.age,
        country: this.props.currentUser.country
    };

    editUser = (name, mail, age, country, password, newPassword, repeatNewPassword) => {
        // const {mail, password, newPassword, repeatNewPassword, name, _id, age, country} = this.state;
        const {_id} = this.state;
        const {editUser} = this.props;
        const currentUser = this.props.currentUser;

        editUser({_id, name, mail, password, age, country, currentUser});
    };

    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const {name, mail, age, country, password, newPassword, repeatNewPassword} = this.state;

        return (
            <Fragment>
                <p>{name}</p>

                <InputWithLabel label="Name" title="Change username" value={name}
                                onInputChange={(value) => {
                                    this.onInputChange(value, 'name')
                                }}/>
                <InputWithLabel label="Email" title="Change email" value={mail}
                                onInputChange={(value) => {
                                    this.onInputChange(value, 'mail')
                                }}/>

                <InputWithLabel label="Age" title="Change age" value={age}
                                onInputChange={(value) => {
                                    this.onInputChange(value, 'age')
                                }}/>

                <InputWithLabel label="Country" title="Change country" value={country}
                                onInputChange={(value) => {
                                    this.onInputChange(value, 'country')
                                }}/>
                <p>Change Password:</p>
                <InputWithLabel label = "Password" title="Change password" value=''
                                type="password"
                                onInputChange={(value) => {
                                    this.onInputChange(value, 'password')
                                }}/>
                <InputWithLabel label = "New password" title="New password" value=''
                                type="password"
                                onInputChange={(value) => {
                                    this.onInputChange(value, 'newPassword')
                                }}/>
                <InputWithLabel label = "Repeat password" title="Repeat password" value=''
                                type="password"
                                onInputChange={(value) => {
                                    this.onInputChange(value, 'repeatNewPassword')
                                }}/>
                {/*<Button title="Save changes" onClick={this.editUser(name, mail, age, country, password, newPassword)}/>*/}
                {/*{newPassword === repeatNewPassword*/}
                    {/*? <Button title="Save changes"*/}
                            {/*onClick={this.editUser(name, mail, age, country, password, newPassword)}/>*/}
                    {/*: <span>Repeat new password</span>*/}
                {/*}*/}
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