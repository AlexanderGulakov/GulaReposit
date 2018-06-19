import React, {Component} from 'react';
import Button from './Button';

import {array, func} from 'prop-types'
import {NavLink} from 'react-router-dom'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getPostInfo} from '../actions/posts'

class PostInfo extends Component {

    constructor(props) {
        super(props);
        this.state = this.mapPropsToState(props);
    }

    mapPropsToState = (props) => {
        const {posts, match: {params}} = props;
        const {id} = params;
        const currentPost = posts.find((el) => {
            return el._id === id;
        });
        return currentPost || {

            title: '',
            body: ''
        };
    };


    componentWillReceiveProps(nextProps) {
        this.setState(this.mapPropsToState(nextProps))
    }

    // save = () => {
    //     const { title, body, _id } = this.state;
    //     const { createPost } = this.props;
    //
    //     createPost({ title, body, _id });
    // };


    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const {title, body, _id} = this.state;
        if (!_id) {
            return (<p>Choose post</p>)
        }

        return (
            <div>
                <h2>{title}</h2>
                <p>body:{body}</p>

            </div>
        )
    }
}


function mapStoreToProps(store) {
    return {
        posts: store.posts.items
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPostInfo

    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(PostInfo);