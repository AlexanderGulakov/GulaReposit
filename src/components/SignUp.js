import React, {Component} from 'react';
import Button from './Button';
import Input from './Input';
import {NavLink} from 'react-router-dom'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {signUp} from '../actions/app'

class SignUp extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        gender: '',
        age: '',
        country: ''
    };
    signUp = () => {
        const {name, email, password, gender, age, country} = this.state;
        const {signUp, history} = this.props;

        signUp({name, email, password, gender, age, country}, history);
    };

    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const {name, email, password, gender, age, country} = this.state;

        return (
            <div>
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
                        this.onInputChange(value, 'email')
                    }}
                    value={email}
                />
                <Input
                    className="inputsForSignInUp"
                    title="Password"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'pass')
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
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signUp
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(SignUp);