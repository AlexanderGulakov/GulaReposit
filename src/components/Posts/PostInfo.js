import React, {Component, Fragment} from 'react';
import Button from '../HTMLComponents/Button';
import 'bootstrap/dist/css/bootstrap.css';
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
        const {match: {params}} = props;
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
            <div className="container">
                <h2 className="text-primary" >{title}</h2>
                <p className="text-left">created:{date}</p>

                <p>{body}</p>
                {userId === currentUser._id &&
                <Fragment>
                    <Button
                        title="EDIT"
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                            return history.push(`/posts/${_id}`);
                        }}>
                    </Button>
                    <Button
                        title="DELETE"
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                            this.deletePost(_id);
                        }}>
                    </Button>
                </Fragment>
                }
                <Comments postId={_id}/>
            </div>
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