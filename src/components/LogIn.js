import React, { Component } from 'react';
import Button from './Button';
import Input from './Input';
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logIn } from '../actions/app'

class LogIn extends Component {
    state = {
        email: '',
        password: ''
    };
    logIn = () => {
        const { email, password } = this.state;
        const { logIn } = this.props;

        logIn({ email, password });
    };

    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const { email, password } = this.state;

        return (<div>
                <h1>Log In</h1>
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
                        this.onInputChange(value, 'password')
                    }}
                    value={password}
                    type="password"
                />
                <Button
                    className="buttonsForSignInUp"
                    title="Submit"
                    onClick={this.logIn}
                />
                <NavLink className="navlink" to="/signUp">Don't have account?</NavLink>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logIn
    }, dispatch)
}
export default connect(null, mapDispatchToProps)(LogIn);