import React, {Component} from 'react';
import Button from './Button';

class SignUp extends Component{
    signUp=()=>{
        console.log(this.emailInput.value);
    };
    render(){
        return (
            <div>
                <h1>Sign Up</h1>
                <label>Email</label>
                <input placeholder="email"/>
            </div>
        )
    }
}