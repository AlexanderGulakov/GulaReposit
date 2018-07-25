import React, {Component, Fragment} from 'react';
import Button from '../HTMLComponents/Button';
import Input from '../HTMLComponents/InputWithLabel';
import { string, func,bool } from 'prop-types';

import {addComment, deleteComment, editComment} from '../../actions/comments';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
            editText: '',
            name: '',
            isEdit: false,
            activeCommentId: ''
        };
    }

    deleteComment = (id) => {
        const {deleteComment} = this.props;
        deleteComment(id);
    };
    editComment = (_id, body) => {
        this.setState({
            isEdit: _id !== this.state.activeCommentId ? true : !this.state.isEdit,
            activeCommentId: _id,
            editText: body
        });
    };
    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };
    save = () => {
        const {body, _id} = this.state;
        const {addComment, postId} = this.props;

        addComment({body, postId, _id});
    };
    saveEditComment = (_id, body) => {
        const {editComment} = this.props;
        this.setState({
            isEdit: !this.state.isEdit,
            activeCommentId: '',
            editText: ''
        });
        editComment({_id, body});
    };
    renderComments = (comment) => {
        const {currentUser} = this.props;

        const edit = (this.state.isEdit && comment._id === this.state.activeCommentId)
            ?
            <div>
                <Input value={this.state.editText}
                       title="edit text"
                       onInputChange={(value) => {
                           this.onInputChange(value, 'editText')
                       }}
                />
                <Button title="Send"
                        className="btn btn-success btn-sm"
                        onClick={() => {
                            return this.saveEditComment(comment._id, this.state.editText)
                        }}
                />
            </div>
            :
            <p className="mb-1" id={comment._id}>{comment.body}</p>;
        return (
            <li key={comment._id} className="list-group-item list-group-item-action flex-column align-items-start">

                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{comment.authorInfo.name}</h5>
                    <small className="text-muted">{comment.date}</small>
                </div>
                {edit}
                {comment.authorId === currentUser._id &&
                <Fragment>
                    <Button title="EDIT" className="btn btn-primary btn-sm"
                            onClick={() => this.editComment(comment._id, comment.body)}
                    />
                    <Button title="DELETE" className="btn btn-danger btn-sm" onClick={() => {
                        this.deleteComment(comment._id);
                    }}/>
                </Fragment>
                }
            </li>
        )
    };
    render() {
        const {currentPost: {comments}} = this.props;
        const {body} = this.state;
        return (
            <Fragment>
                <hr/>
                <h3>Comments</h3>
                {comments &&
                    <div className="col-4">
                    <ul className="list-group">{comments.map(this.renderComments)}</ul>
                    </div>
                }
                <hr/>
                <h3>Add comment</h3>
                <textarea className="col-4"
                    title="Body"
                    onChange={(e) => {
                        this.onInputChange(e.currentTarget.value, 'body')
                    }}
                    value={body}
                />
                <Button title="ADD"
                        className="btn btn-success"
                        onClick={this.save}
                />
                <hr/>
            </Fragment>
        )
    }
}
Comments.propTypes = {
    body:string,
    editText:string,
    isEdit: bool,
    name: string,
    onInputChange: func
};

function mapStoreToProps(store) {
    return {
        currentUser: store.users.currentUser,
        currentPost: store.posts.currentPost,
        posts: store.posts.items
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addComment,
        editComment,
        deleteComment
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(Comments);