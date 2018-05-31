import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import App from './App';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { Route, Switch } from 'react-router-dom';

import { changeLogin } from '../actions/app'

class Root extends Component {

    setLogin = (history) => {
        const { changeLogin } = this.props;

        changeLogin(true);

        history.replace('/')
    };

    render() {
        const { isLoggedIn } = this.props;

        return (
            <Switch>
                {isLoggedIn && <Route path="/" component={App} />}
                <Route exact path="/signUp" render={({ location, history }) => {
                    console.log(location);
                    return (<SignUp setLogin={() => {
                        this.setLogin(history)
                    }} />);
                }} />
                <Route exact path="/signIn" render={({ location }) => {
                    console.log(location);
                    return (<SignIn setLogin={this.setLogin} />);
                }} />
            </Switch>
        );
    }
}

function mapStoreToProps(store) {
    return {
        isLoggedIn: store.app.isLoggedIn
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeLogin
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(Root);
