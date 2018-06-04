import React, {Component} from 'react';
import Button from './Button';
import Input from './Input';
import {NavLink} from 'react-router-dom'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {createPost} from '../actions/app'

class CreatePost extends Component {
    state = {
        title: '',
        body: '',
        description:'',
        userId: '',
        rating: ''


    };
    createPost = () => {
        const {title, body, description,userId,rating} = this.state;
        const {createPost, history} = this.props;

        createPost({title, body, description,userId,rating}, history);
    };

    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const {title, body, description, userId,rating} = this.state;

        return (
            <div>
                <h1>Add new post</h1>
                <Input
                    className="inputsForPosts"
                    title="Title"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'title')
                    }}
                    value={title}
                />

                <Input
                    className="inputsForPosts"
                    title="Body"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'body')
                    }}
                    value={body}
                />
                <Input
                    className="inputsForPosts"
                    title="Description"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'description')
                    }}
                    value={description}

                />
                <Input
                    className="inputsForPosts"
                    title="UserId"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'userId')
                    }}
                    value={userId}
                />
                <Input
                    className="inputsForPosts"
                    title="rating"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'rating')
                    }}
                    value={rating}
                />

                <Button
                    className="buttonsForSignInUp"
                    title="Submit"
                    onClick={this.createPost}
                />
                <NavLink className="navlink" to="/posts">Just want to read the available posts?</NavLink>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createPost
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(CreatePost);