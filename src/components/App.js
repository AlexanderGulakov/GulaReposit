import React, {Fragment, Component} from 'react';
import NavBar from './HTMLComponents/NavBar';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Users from './Users/Users';
import Posts from './Posts/Posts';
import PostsList from './Posts/PostsList';
import PostInfo from './Posts/PostInfo';
import CreateOrEditPost from './Posts/CreateOrEditPost';
import EditUserProfile from "./Users/EditUserProfile";
import {Route, Switch} from 'react-router-dom';
import {logOut} from '../actions/app'

class App extends Component {

    render() {
        const {logOut} = this.props;
        return (
            <Fragment>

                <NavBar logOut={logOut}/>
                <Switch>
                    <Route exact path="/users" component={Users}/>
                    <Route exact path="/posts" component={Posts}/>
                    <Route exact path="/postsList" component={PostsList}/>
                    <Route exact path="/createPost" component={CreateOrEditPost}/>
                    <Route path="/posts/:id" component={CreateOrEditPost}/>
                    <Route exact path="/postsList/:id" component={PostInfo}/>
                    <Route exact path="/myProfile" component={EditUserProfile}/>

                </Switch>
            </Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logOut
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(App)
