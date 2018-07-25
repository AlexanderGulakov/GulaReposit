import React, {Component} from 'react';
import Button from '../HTMLComponents/Button';
import Input from '../HTMLComponents/InputWithLabel';
import {array, func} from 'prop-types'
import {NavLink} from 'react-router-dom'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {createPost} from '../../actions/posts'

class CreateOrEditPost extends Component {
    constructor(props) {
        super(props);
        this.state = this.mapPropsToState(props);
    }

    mapPropsToState = (props) => {
        const {posts, match: {params}, currentPost} = props;
        const {id} = params;
        const currentPostNew = posts.find((el) => {
            return el._id === id;
        });
        return currentPostNew || currentPost || {
            title: '',
            description: ''
        };
    };

    componentWillReceiveProps(nextProps) {
        this.setState(this.mapPropsToState(nextProps))
    }

    save = () => {
        const {title, body, _id} = this.state;
        const {createPost, history} = this.props;

        createPost({title, body, _id});
        history.push('/postsList');
    };

    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const {title, body, _id} = this.state;
        return (
            <div>
                <h1>{_id ? 'Edit' : 'Add'} Post</h1>
                <Input
                    className="inputsForSignInUp"
                    title="Title"
                    onInputChange={(value) => {
                        this.onInputChange(value, 'title')
                    }}
                    value={title}
                />

                <textarea className="inputsForSignInUp"
                          value={body}
                          title="Body"
                          onChange={(e) => {
                              this.onInputChange(e.currentTarget.value, 'body')
                          }}
                />
                <Button
                    className="buttonsForSignInUp"
                    title="Submit"
                    onClick={this.save}
                />
                <NavLink className="navlink" to="/posts">Just want to read the available posts?</NavLink>
            </div>
        );
    }
}

CreateOrEditPost.propTypes = {
    posts: array.isRequired,
    createPost: func.isRequired
};

function mapStoreToProps(store) {
    return {
        posts: store.posts.items,
        currentPost: store.posts.currentPost
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createPost
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(CreateOrEditPost);