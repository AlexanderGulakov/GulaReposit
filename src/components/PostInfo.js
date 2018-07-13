import React, {Component,Fragment} from 'react';
import Button from './Button';

import {array, func} from 'prop-types'


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getPostInfo, deletePost} from '../actions/posts'
import {deleteComment} from "../actions/comments"
import AddComment from './Comments/AddComment'


class PostInfo extends Component {

    constructor(props) {
        super(props);
        this.state = this.mapPropsToState(props);
    }
    componentDidMount() {

        const{_id}=this.state;
        const {getPostInfo} = this.props;

        getPostInfo(_id);
    }
    mapPropsToState = (props) => {
        const {posts, match: {params}} = props;
        const {id} = params;
        // const currentPost = posts.find((el) => {
        //     return el._id === id;
        // });
        return  {_id:id};
    };
    deletePost = (id) => {
        const {deletePost,history} = this.props;
        deletePost(id);
        history.push('/postsList');
    };
    deleteComment = (id) => {
        const {deleteComment} = this.props;
        deleteComment(id);
    };


    componentWillReceiveProps(nextProps) {
        this.setState(this.mapPropsToState(nextProps))
    }



    render() {

         // const {title, body, _id, userId,comments} = this.state;
         const {currentUser, history,currentPost:{title,body,_id,userId,comments,date}} = this.props;
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
                <h3>Comments</h3>
                <hr/>
                {comments &&
                <ul className="commentsList">
                    {comments.map((comment) => {
                        return (
                            <li key={comment._id}>{comment.date},{comment.body}
                           ,{comment.authorInfo.name}
                                ,{comment.authorId === currentUser._id &&
                                <Fragment>

                                    <Button title="DELETE" onClick={() => {this.deleteComment(comment._id);}}/>
                                </Fragment>
                                }
                            </li>
                        );
                    })}
                </ul>
                }
                <AddComment postId={`${_id}`}/>
            </Fragment>
        )
    }
}


function mapStoreToProps(store) {
    return {
        posts: store.posts.items,
        currentUser: store.users.currentUser,
        currentPost:store.posts.currentPost
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPostInfo,
        deletePost,
        deleteComment

    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(PostInfo);