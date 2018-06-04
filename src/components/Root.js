import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import App from './App';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Users from './Users';
import Posts from './Posts';
import CreatePost from './CreatePost';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router'

import { changeLogin } from '../actions/app'

class Root extends Component {
    componentDidMount() {
        const { isLoggedIn, history } = this.props;

        if (!isLoggedIn) {
            history.push('/logIn')
        }
    }

    render() {
        const { isLoggedIn } = this.props;

        return (

            <Switch>
                {isLoggedIn && <Route path="/" component={App} />}
                <Route exact path="/signUp" component={SignUp} />
                <Route exact path="/logIn" component={LogIn} />
                <Route  path="/users" component={Users} />
                <Route  path="/posts" component={Posts} />
                <Route  path="/createPost" component={CreatePost} /> {/*посилання за яким генерується сторінка createPost */}
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

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Root));