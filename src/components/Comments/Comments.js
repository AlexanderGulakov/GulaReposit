import React, {Component, Fragment} from 'react';
import Button from '../Button';

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
    save = () => {
        const {body,_id} = this.state;
        const {addComment, postId} = this.props;

        addComment({body, postId,_id});
    };
    // sendComment = () => {
    //     const {
    //         postId,
    //         currentUser: {name},
    //         currentUser: {_id: userId},
    //         addComment
    //     } = this.props;
    //     const {body} = this.state;
    //
    //     addComment({postId, name, body, userId});
    // };
    deleteComment = (id) => {
        const {deleteComment} = this.props;
        deleteComment(id);
    };
    // editComment = (_id, text) => {
    //     this.setState({
    //         isEdit: !this.state.isEdit,
    //         activeCommentId: _id,
    //         editText: text
    //     });
    //
    // };
    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };
    // sendEditComment = (_id, body) => {
    //     const {editComment} = this.props;
    //     this.setState({
    //         isEdit: !this.state.isEdit,
    //         activeCommentId: '',
    //         editText: ''
    //     });
    //     editComment({_id, body});
    // };
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
       //  const edit = (this.state.isEdit && el._id === this.state.activeCommentId) ?
       //      <div>
       //          <Input value={this.state.editText}
       //                 onInputChange={(value) => {
       //                     this.onInputChange(value, 'editText')
       //                 }}
       //          />
       //          <Button title=">>>"
       //                  onClick={() => {
       //                      return this.sendEditComment(el._id, this.state.editText)
       //                  }}
       // //                  className='btn-primary'
       // //          />
       // //      </div> :
       // //      <span id={el._id}>{el.body}</span>;
       // //  if (!el._id) return; //becouse created empty obj in getPost aggregate
        return (
       //      <li key={el._id}>
       //          {el.name}-> {edit}
       //          {el.userId === _id && Buttons}
       //      </li>
        <li key={comment._id}
                        //onClick={() => this.props.editComment(comment)}
        >
            {comment.date},{comment.body},
            {comment.authorInfo.name},
            {comment.authorId === currentUser._id &&
                        <Fragment>
                            <Button title="EDIT"
                                //  onClick={() => this.props.addComment(comment)}
                                    onClick={() => this.props.editComment(comment)}
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
        //console.log(this.props);
        // const {comments} = this.props;
        // const {body} = this.state;
        return (
            <Fragment>
                <h3>Comments</h3>

                <hr/>
                {comments &&
                <ul>
                    {comments.map(this.renderComments)}
                </ul>

                // <ul className="commentsList">
                    //     {comments.map((comment) => {
                    //         return (
                    //
                    //         );
                    //     })}
                    // </ul>
                }
                <hr/>
                {/*<h3>{_id ? 'Edit' : 'Add'} comment</h3>*/}
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
                {/*<hr/>*/}
                {/*<h4>Comments:</h4>*/}
                {/*<ul>*/}
                    {/*{comments.map(this.renderComments)}*/}
                {/*</ul>*/}
                {/*<Input*/}
                {/*title="New comment"*/}
                {/*onInputChange={(value) => {*/}
                {/*this.onInputChange(value, 'body')*/}
                {/*}}*/}
                {/*value={body}*/}
                {/*/>*/}
                {/*<Button*/}
                {/*title='Send comment'*/}
                {/*className='btn btn-primary'*/}
                {/*onClick={this.sendComment}*/}
                {/*/>*/}
            </Fragment>
        )
    }
}

function mapStoreToProps(store) {
    return {
        currentUser: store.users.currentUser,
        currentPost:store.posts.currentPost,
        posts: store.posts.items
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addComment,
        editComment,
        deleteComment,

    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(Comments);