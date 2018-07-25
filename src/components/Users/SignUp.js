import React, {Component} from 'react';
import Button from '../HTMLComponents/Button';
import Input from '../HTMLComponents/InputWithLabel';
import {NavLink} from 'react-router-dom'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {signUp} from '../../actions/app'

class SignUp extends Component {
    state = {
        name: '',
        mail: '',
        password: '',
        gender: '',
        age: '',
        country: ''
    };
    signUp = () => {
        const {name, mail, password, gender, age, country} = this.state;
        const {signUp, history} = this.props;

        signUp({name, mail, password, gender, age, country}, history);
    };

    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const {name, mail, password, gender, age, country} = this.state;
        const {errors} = this.props;

        return (
            <form className="form">
                <h1 className="text-primary">Sign up with your email address</h1>
                <div className="form-group">
                    <Input
                        className="form-control"
                        title="Name"
                        onInputChange={(value) => {
                            this.onInputChange(value, 'name')
                        }}
                        value={name}
                    />

                    <Input
                        className="form-control"
                        title="Email"
                        onInputChange={(value) => {
                            this.onInputChange(value, 'mail')
                        }}
                        error={errors.mail}
                        value={mail}
                    />
                    <Input
                        className="form-control"
                        title="Password"
                        onInputChange={(value) => {
                            this.onInputChange(value, 'password')
                        }}
                        value={password}
                        type="password"
                    />
                    <Input
                        className="form-control"
                        title="Gender"
                        onInputChange={(value) => {
                            this.onInputChange(value, 'gender')
                        }}
                        value={gender}
                    />
                    <Input
                        className="form-control"
                        title="Age"
                        onInputChange={(value) => {
                            this.onInputChange(value, 'age')
                        }}
                        value={age}
                    />
                    <Input
                        className="form-control"
                        title="Country"
                        onInputChange={(value) => {
                            this.onInputChange(value, 'country')
                        }}
                        value={country}
                    />
                </div>
                <Button
                    className="btn btn-primary"
                    type="Submit"
                    title="Submit"
                    onClick={this.signUp}
                />
                <NavLink className="list-group-item list-group-item-action list-group-item-dark" to="/logIn">Already have account?</NavLink>
            </form>
        );
    }
}

function mapStoreToProps(store) {
    return {
        errors: store.app.errors
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signUp
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(SignUp);