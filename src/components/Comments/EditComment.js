import React, {Component,Fragment} from 'react';
import Button from '../Button';

import { array, func } from 'prop-types'


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {editComment} from '../../actions/comments'

class EditComment extends Component {
    constructor(props){
        super(props);
        this.state=this.mapPropsToState(props);
    }
    mapPropsToState=(props)=>{
        const{comments,_id}=props;
        // const{_id}= state;
        const currentComment = comments.find((el) => {
            return el._id === _id;
        });
        return currentComment || {
            body: ''
        };
    };

    componentWillReceiveProps(nextProps) {
        this.setState(this.mapPropsToState(nextProps))
    }

    save = () => {
        const { body, _id } = this.state;
        const { editComment,history } = this.props;

        editComment({ body, _id });

    };
    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const {body,_id} = this.state;

        return (
            <Fragment>
                <textarea
                          value={body}
                          title="Body"
                          onChange={(e) => {
                              this.onInputChange(e.currentTarget.value, 'body')
                          }}

                />
                <Button

                    title="Save"
                    onClick={this.save}
                />
            </Fragment>
        );
    }
}
// CreateOrEditPost.propTypes = {
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
        editComment
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(EditComment);