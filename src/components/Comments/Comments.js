import React, {Component, Fragment} from 'react';
import Button from '../HTMLComponents/Button';
import Input from '../HTMLComponents/InputWithLabel';

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
            isEdit: _id!==this.state.activeCommentId? true: !this.state.isEdit,
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
        //const {currentUser: {_id}} = this.props;
        //  const Buttons =
        //      <div>
        //          <Button title='Edit' onClick={() => {
        //              return this.editComment(el._id, el.body)
        //          }} className='btn-success'/>
        //          <Button title='Delete' onClick={() => {
        //              return this.deleteComment(el._id)
        //          }} className='btn-danger'/>
        //      </div>;
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
                            onClick={() => {
                                return this.saveEditComment(comment._id, this.state.editText)
                            }}
                    />
                </div>
            :
                <span id={comment._id}>{comment.body}</span>;
        // //  if (!el._id) return; //becouse created empty obj in getPost aggregate
        return (
            //      <li key={el._id}>
            //          {el.name}-> {edit}
            //          {el.userId === _id && Buttons}
            //      </li>
            <li key={comment._id}>
                {comment.date},
                {comment.authorInfo.name},
                {edit},
                {comment.authorId === currentUser._id &&
                <Fragment>
                    <Button title="EDIT"

                            onClick={() => this.editComment(comment._id, comment.body)}
                    />
                    <Button title="DELETE" onClick={() => {
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
                <h3>Comments</h3>

                <hr/>
                {comments &&
                <ul>{comments.map(this.renderComments)}</ul>
                }
                <hr/>
                <h3>Add comment</h3>
                <textarea
                    title="Body"
                    onChange={(e) => {
                        this.onInputChange(e.currentTarget.value, 'body')
                    }}
                    value={body}
                />
                <Button title="ADD"
                        onClick={this.save}
                />
                <hr/>
            </Fragment>
        )
    }
}

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