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
        pass: ''
    };
    logIn = () => {
        const { email, pass } = this.state;
        const { logIn } = this.props;

        logIn({ email, pass });
    };

    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const { email, pass } = this.state;

        return (<div>
                <h1>Log In</h1>
                <Input
                    title="Email"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'email')
                    }}
                    value={email}
                />
                <Input
                    title="Password"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'pass')
                    }}
                    value={pass}
                    type="password"
                />
                <Button
                    title="Submit"
                    onClick={this.logIn}
                />
                <NavLink to="/signUp">Don't have account?</NavLink>
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