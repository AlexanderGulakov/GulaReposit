import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Button from '../HTMLComponents/Button';
import InputWithLabel from '../HTMLComponents/InputWithLabel';
import {editUser} from '../../actions/app'

const sha256 = require('crypto-js/sha256');

class EditUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: this.props.currentUser.mail,
            password: '',
            newPassword: '',
            repeatNewPassword: '',
            name: this.props.currentUser.name,
            _id: this.props.currentUser._id,
            age: this.props.currentUser.age,
            country: this.props.currentUser.country,
            isOpen: false,
            isChangePassword: false
        };
    }

    openCloseEdit = () => {

        this.setState({
            isOpen: !this.state.isOpen

        });

    };
    openCloseChangePassword = () => {
        this.setState({
            isChangePassword: !this.state.isChangePassword
        });
    };

    editUser = () => {
        const {mail, name, _id, age, country} = this.state;
        const {editUser} = this.props;
        editUser({_id, name, mail, age, country});
        this.setState({
            isOpen: !this.state.isOpen

        });
    };
    changePassword = () => {

        const {currentUser} = this.props;

        const {editUser} = this.props;
        const {mail, name, _id, age, country, newPassword, repeatNewPassword} = this.state;
        let {password} = this.state;

        password = sha256(password).toString();
        console.log(password);
        console.log(newPassword);
        console.log(repeatNewPassword);
        (password === currentUser.password && newPassword && newPassword === repeatNewPassword) ?
            editUser({mail, name, _id, age, country, password, newPassword}) :
            this.alertError(password, currentUser.password, newPassword);
    };
    alertError = (password, currentUserPassword, newPassword) => {
        if (password !== currentUserPassword)
            return alert('Please, enter the current password');
        else {
            if (!newPassword) return alert('enter new password');
            else return alert('repeat new password!');
        }

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
                <section className="h-100">
                    <header className="container h-100">
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <div className="d-flex flex-column col-md-3">
                                <h4 className="align-self-center mt-15">{name}</h4>
                                <p className="lead">mail:{mail}</p>
                                <p className="lead">age:{age}</p>
                                <p className="lead">country:{country}</p>

                                <Button title="EditProfile" className="btn btn-primary"
                                        onClick={() =>
                                            this.openCloseEdit()
                                        }/>
                                <Button title="ChangePass" className="btn btn-danger"
                                        onClick={() =>
                                            this.openCloseChangePassword()
                                        }/>

                                {this.state.isOpen
                                    ?
                                    <Fragment>

                                        <InputWithLabel className="form-control" label="Name" title="Change username"
                                                        value={name}
                                                        onInputChange={(value) => {
                                                            this.onInputChange(value, 'name')
                                                        }}/>
                                        <InputWithLabel className="form-control" label="Email" title="Change email"
                                                        value={mail}
                                                        onInputChange={(value) => {
                                                            this.onInputChange(value, 'mail')
                                                        }}/>

                                        <InputWithLabel className="form-control" label="Age" title="Change age"
                                                        value={age}
                                                        onInputChange={(value) => {
                                                            this.onInputChange(value, 'age')
                                                        }}/>

                                        <InputWithLabel className="form-control" label="Country" title="Change country"
                                                        value={country}
                                                        onInputChange={(value) => {
                                                            this.onInputChange(value, 'country')
                                                        }}/>

                                        <Button title="Save changes" className="btn btn-success"
                                                onClick={this.editUser}/>

                                    </Fragment>
                                    :
                                    <div>
                                    </div>
                                }
                                {this.state.isChangePassword
                                    ?
                                    <Fragment>
                                        <p>Change Password:</p>
                                        <InputWithLabel className="form-control" label="Password"
                                                        title="Current password"
                                                        value={password}
                                                        type="password"
                                                        onInputChange={(value) => {
                                                            this.onInputChange(value, 'password')
                                                        }}/>
                                        <InputWithLabel className="form-control" label="New password"
                                                        title="New password"
                                                        value={newPassword}
                                                        type="password"
                                                        onInputChange={(value) => {
                                                            this.onInputChange(value, 'newPassword')
                                                        }}/>
                                        <InputWithLabel className="form-control" label="Repeat password"
                                                        title="Repeat password"
                                                        value={repeatNewPassword}

                                                        type="password"
                                                        onInputChange={(value) => {
                                                            this.onInputChange(value, 'repeatNewPassword')
                                                        }}/>
                                        <Button title="Save changes" className="btn btn-success"
                                                onClick={this.changePassword}/>

                                    </Fragment>
                                    :
                                    <div>
                                    </div>
                                }
                            </div>
                        </div>
                    </header>
                </section>
            </Fragment>
        );
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