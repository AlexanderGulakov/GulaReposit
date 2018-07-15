import React, {Component} from 'react';
import Button from '../Button';

import {array, func} from 'prop-types'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {addComment} from "../../actions/comments"


class AddComment extends Component {
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
        const {body} = this.state;
        const {addComment, postId} = this.props;

        addComment({body, postId});
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
                <h3>{_id ? 'Edit' : 'Add'} comment</h3>

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
        comments: store.comments
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addComment

    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(AddComment);