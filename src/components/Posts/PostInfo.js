import React, {Component, Fragment} from 'react';
import Button from '../HTMLComponents/Button';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getPostInfo, deletePost,} from '../../actions/posts'

import Comments from '../Comments/Comments'

class PostInfo extends Component {

    constructor(props) {
        super(props);
        this.state = this.mapPropsToState(props);
    }

    componentDidMount() {

        const {_id} = this.state;
        const {getPostInfo} = this.props;

        getPostInfo(_id);
    }

    mapPropsToState = (props) => {
        const {posts, match: {params}} = props;
        const {id} = params;
        return {_id: id};
    };
    deletePost = (id) => {
        const {deletePost, history} = this.props;
        deletePost(id);
        history.push('/postsList');
    };

    componentWillReceiveProps(nextProps) {
        this.setState(this.mapPropsToState(nextProps))
    }

    render() {
        const {currentUser, history, currentPost: {title, body, _id, userId, date}} = this.props;
        if (!_id) {
            return (<p>Choose post</p>)
        }
        return (
            <Fragment>


                <h2>{title}</h2>
                <p>created:{date}</p>

                <pre>{body}</pre>
                {userId === currentUser._id &&
                <Fragment>
                    <Button
                        title="EDIT"
                        onClick={() => {
                            return history.push(`/posts/${_id}`);
                        }}>
                    </Button>
                    <Button
                        title="DELETE"
                        onClick={() => {
                            this.deletePost(_id);
                        }}>
                    </Button>
                </Fragment>
                }
                <Comments postId={_id}/>

            </Fragment>
        )
    }
}

function mapStoreToProps(store) {
    return {
        posts: store.posts.items,
        currentUser: store.users.currentUser,
        currentPost: store.posts.currentPost,
        comments: store.posts.currentPost.comments
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPostInfo,
        deletePost
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(PostInfo);