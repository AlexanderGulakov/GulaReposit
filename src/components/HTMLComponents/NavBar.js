import React from 'react';
import {NavLink} from 'react-router-dom'

export default function ({logOut}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/users">Users</NavLink>
                <NavLink className="navbar-brand" to="/postsList">Posts List</NavLink>
                <NavLink className="navbar-brand" to="/createPost">Add Post</NavLink>
                <NavLink className="navbar-brand" to="/myProfile">My Profile</NavLink>
                <NavLink className="navbar-brand" to="/logIn" onClick={logOut}>Sign Out</NavLink>

            </div>
        </nav>
    );
}
