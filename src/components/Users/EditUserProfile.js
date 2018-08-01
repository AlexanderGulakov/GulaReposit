import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Button from '../HTMLComponents/Button';
import InputWithLabel from '../HTMLComponents/InputWithLabel';
import {editUser} from '../../actions/app'

class EditUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: this.props.currentUser.mail,
            password: '',
            newPassword:'',
            repeatNewPassword:'',
            name: this.props.currentUser.name,
            _id: this.props.currentUser._id,
            age: this.props.currentUser.age,
            country: this.props.currentUser.country,
            isOpen: false,
            isChangePassword:false
        };
    }

    openCloseEdit = () => {

        this.setState({
            isOpen: !this.state.isOpen
        });
        console.log(`${this.state.isOpen}`)
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
                <div className="container">
                    <h4 className="lead">{name}</h4>
                    <p className="lead">mail:{mail}</p>
                    <p className="lead">age:{age}</p>
                    <p className="lead">country:{country}</p>


                    <Button title="EditProfile" className="btn btn-danger"
                            onClick={() =>
                                this.openCloseEdit()
                            }/>
                    <Button title="ChangePass" className="btn btn-danger"
                            onClick={() =>
                                this.openCloseChangePassword()
                            }/>
                </div>
                {this.state.isOpen
                    ?
                    <div className="form">
                        <div className="form-group">

                            <InputWithLabel className="form-control" label="Name" title="Change username" value={name}
                                            onInputChange={(value) => {
                                                this.onInputChange(value, 'name')
                                            }}/>
                            <InputWithLabel className="form-control" label="Email" title="Change email" value={mail}
                                            onInputChange={(value) => {
                                                this.onInputChange(value, 'mail')
                                            }}/>

                            <InputWithLabel className="form-control" label="Age" title="Change age" value={age}
                                            onInputChange={(value) => {
                                                this.onInputChange(value, 'age')
                                            }}/>

                            <InputWithLabel className="form-control" label="Country" title="Change country"
                                            value={country}
                                            onInputChange={(value) => {
                                                this.onInputChange(value, 'country')
                                            }}/>

                            <Button title="Save changes" className="btn btn-danger"
                                    onClick={this.editUser}/>
                            {/*<Button title="Save changes" onClick={this.editUser(name, mail, age, country, password, newPassword)}/>*/}
                            {/*{newPassword === repeatNewPassword*/}
                            {/*? <Button title="Save changes"*/}
                            {/*onClick={this.editUser(name, mail, age, country, password, newPassword)}/>*/}
                            {/*: <span>Repeat new password</span>*/}
                            {/*}*/}
                        </div>
                    </div>
                    :
                    <div>
                    </div>
                }
                {this.state.isChangePassword
                    ?
                    <div className="form">
                        <div className="form-group">
                            <p>Change Password:</p>
                            <InputWithLabel className="form-control" label="Password" title="Current password"
                                            value={password}
                                            type="password"
                                            onInputChange={(value) => {
                                                this.onInputChange(value, 'password')
                                            }}/>
                            <InputWithLabel className="form-control" label="New password" title="New password" value=''
                                            type="password"
                                            onInputChange={(value) => {
                                                this.onInputChange(value, 'newPassword')
                                            }}/>
                            <InputWithLabel className="form-control" label="Repeat password" title="Repeat password"
                                            value=''
                                            type="password"
                                            onInputChange={(value) => {
                                                this.onInputChange(value, 'repeatNewPassword')
                                            }}/>
                            <Button title="Save changes" className="btn btn-danger"
                                    onClick={this.editUser}/>
                            {/*<Button title="Save changes" onClick={this.editUser(name, mail, age, country, password, newPassword)}/>*/}
                            {/*{newPassword === repeatNewPassword*/}
                            {/*? <Button title="Save changes"*/}
                            {/*onClick={this.editUser(name, mail, age, country, password, newPassword)}/>*/}
                            {/*: <span>Repeat new password</span>*/}
                            {/*}*/}
                        </div>
                    </div>
                    :
                    <div>
                    </div>
                }
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