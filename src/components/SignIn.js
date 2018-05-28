import React, { Component } from 'react';
import Button from './Button';
import Input from './Input';
import { NavLink } from 'react-router-dom'

class SignIn extends Component {
    state = {
        email: '',
        pass: ''
    };
    signIn = () => {
        const { email, pass } = this.state;
        const { setLogin } = this.props;

        // тут має бути запит на бекенд і в разі успіху - викл метод

        setLogin();

        console.log(email, pass);
    };

    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const { email, pass } = this.state;

        return (<div>
                <h1>Sign In</h1>
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
                    onClick={this.signIn}
                />
                <NavLink to="/signUp">Don't have account?</NavLink>
            </div>
        );
    }
}
export default SignIn;