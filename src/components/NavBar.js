


import React from 'react';
import { NavLink } from 'react-router-dom'
import {logOut} from '../actions/app'
export default function () {
    return (
        <nav className={"nav"}>
            <div className={"container"}>
                <NavLink className="NavBarLink" to="/users">Users</NavLink>
                <NavLink className="NavBarLink" to="/posts">Posts</NavLink>
                <NavLink className="NavBarLink" to="/createPost">Add Post</NavLink>
                <NavLink className="NavBarLink" to="/myProfile">My Profile</NavLink>
                <NavLink className="NavBarLink" to="/logIn" onClick={logOut()} >Sign Out</NavLink>

            </div>
        </nav>
    );
}
