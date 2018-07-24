import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {array} from 'prop-types'


import {getPosts} from '../../actions/posts'

class Posts extends Component {
    componentDidMount() {
        const {getPosts} = this.props;

        getPosts();
    }


    redirectToPost = (currentPost) => {
        const {history} = this.props;
        return history.push(`/postsList/${currentPost._id}`);

    };

    renderLi = () => {
        return this.props.posts.map((post)=>{
            return (
                <li key = {post._id} onClick={() => this.redirectToPost(post)}>{post.title}</li>
            );
        });
    };
    render() {

        return (
            <Fragment>
                <h1>Posts</h1>
                <ol className="postsList">
                    {this.renderLi()}
                </ol>


            </Fragment>
        );
    }
}

Posts.propTypes = {
    posts: array.isRequired
};

function mapStoreToProps(store) {
    return {
        posts: store.posts.items,
        }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPosts
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(Posts);