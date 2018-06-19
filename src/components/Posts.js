import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Button from './Button';
import {array} from 'prop-types'


import {getPosts, deletePost} from '../actions/posts'

class Posts extends Component {
    componentDidMount() {
        const {getPosts} = this.props;

        getPosts();
    }

    deletePost = (id) => {
        const {deletePost} = this.props;

        deletePost(id);
    };
    redirectToPost = (currentPost) => {
        const {history} = this.props;
        return history.push(`/posts/${currentPost._id}`);

    };


    renderTH = () => {
        return (
            <tr>
                <th>{'title'}</th>
                <th>{'body'}</th>

                <th>{'userId'}</th>
                <th>{'rating'}</th>
                <th>{'created'}</th>
                <th/>
                <th/>

            </tr>
        );
    };
    renderRow = (el) => {
        const {currentUser} = this.props;
        return (
            <tr key={el._id}>
                <td>{el.title}</td>
                <td>{el.body}</td>

                <td>{el.userId}</td>
                <td>{el.rating}</td>
                <td>{el.created}</td>
                <td>
                    {el.userId === currentUser._id &&
                    <Button
                        title="EDIT"
                        onClick={() => {
                            return this.redirectToPost(el)
                        }}>
                    </Button>}
                </td>
                <td>
                    <Button
                        title="DELETE"
                        onClick={() => {
                            this.deletePost(el._id);
                        }}>
                    </Button>
                </td>
            </tr>
        );
    };

    render() {
        const {posts} = this.props;

        return (
            <Fragment>
                <h1>My Posts</h1>
                <table className="tables">
                    <thead>
                    {this.renderTH()}
                    </thead>
                    <tbody>
                    {posts.map(this.renderRow)}
                    </tbody>
                </table>
                <form action="/createPost/">
                    <Button title={'CREATE POST'} type={"submit"}>
                    </Button>
                </form>
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
        currentUser: store.users.currentUser //now currentUser is available in this component
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPosts,
        deletePost,
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(Posts);