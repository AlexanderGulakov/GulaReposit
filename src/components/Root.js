import React, {Component} from 'react';
import App from './App';
import SignUp from './SignUp';
import SignIn from './SignIn';
import {Route, Switch} from 'react-router-dom';

class Root extends Component {
    state = {
        loggendIn: false
    };

    setLogin = (history) => {
        this.setState({
            loggendIn: true
        });

        history.replace('/')
    };

    render() {
        const {loggendIn} = this.state;

        return (
            <Switch>
                {loggendIn && <Route path="/" component={App}/>}
                <Route exact path="/signUp" render={({location, history}) => {
                    console.log(location);
                    return (<SignUp setLogin={() => {
                        this.setLogin(history)
                    }}/>);
                }}/>
                <Route exact path="/signIn" render={({location}) => {
                    console.log(location);
                    return (<SignIn setLogin={this.setLogin}/>);
                }}/>
            </Switch>
        );
    }
}

export default Root;