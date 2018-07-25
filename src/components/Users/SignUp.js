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
            <form>
                <h1>Sign up with your email address</h1>
                <Input
                    className="inputsForSignInUp"
                    title="Name"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'name')
                    }}
                    value={name}
                />

                <Input
                    className="inputsForSignInUp"
                    title="Email"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'mail')
                    }}
                    error={errors.mail}
                    value={mail}
                />
                <Input
                    className="inputsForSignInUp"
                    title="Password"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'password')
                    }}
                    value={password}
                    type="password"
                />
                <Input
                    className="inputsForSignInUp"
                    title="Gender"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'gender')
                    }}
                    value={gender}
                />
                <Input
                    className="inputsForSignInUp"
                    title="Age"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'age')
                    }}
                    value={age}
                />
                <Input
                    className="inputsForSignInUp"
                    title="Country"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'country')
                    }}
                    value={country}
                />
                <Button
                    className="buttonsForSignInUp"
                    title="Submit"
                    onClick={this.signUp}
                />
                <NavLink className="navlink" to="/logIn">Already have account?</NavLink>
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