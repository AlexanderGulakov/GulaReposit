import React, {Component} from 'react';
import Button from '../Button';

import {array, func} from 'prop-types'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {addComment} from "../../actions/comments"


class AddOrEditComment extends Component {
    constructor(props) {
        super(props);
        this.state = this.mapPropsToState(props);

    }

    mapPropsToState = (props) => {

        return {
                body: ''
        };
    };

    componentWillReceiveProps(nextProps) {
        this.setState(this.mapPropsToState(nextProps))
    }

    save = () => {
        const {body, _id} = this.state;
        const {addComment, postId,history} = this.props;

        addComment({body, _id,postId});
      //  history.push(`/postsList/${postId}`);
    };


    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const {body, _id} = this.state;

        return (
            <div>
                <h3>Add comment</h3>
                <textarea
                    value={body}
                    title="Body"
                          onChange={(e) => {
                    this.onInputChange(e.currentTarget.value, 'body')
                }}
                >
                </textarea>
                <Button title="ADD"
                        onClick={this.save}
                />
                <hr/>



            </div>
        );
    }
}

// AddOrEditComment.propTypes = {
//     posts: array.isRequired,
//     createPost: func.isRequired
// };

function mapStoreToProps(store) {
    return {
        comments: store.comments.items
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addComment

    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(AddOrEditComment);