import React, {Component} from 'react';
import Button from '../HTMLComponents/Button';
import Input from '../HTMLComponents/InputWithLabel';
import {NavLink} from 'react-router-dom'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {logIn} from '../../actions/app'

class LogIn extends Component {
    state = {
        email: '',
        password: ''
    };
    logIn = () => {
        const {email, password} = this.state;
        const {logIn,history} = this.props;

        logIn({mail: email, pass: password},history);
    };

    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const {email, password} = this.state;

        return (
            <form>
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
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logIn
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(LogIn); //connect with redux