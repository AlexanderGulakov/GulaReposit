
import React from 'react';
export default function ({title,className, href}) {
    return (
        <nav className={className[0]}>
            <div className={className[1]}>
                <a href={href[0]} className={className[2]}>{title[0]}</a>
                <ul className={className[3]}>
                    <li><a href={href[1]}>{title[1]}</a></li>
                    <li><a href={href[2]}>{title[2]}</a></li>
                    <li><a href={href[3]}>{title[3]}</a></li>
                </ul>
            </div>
        </nav>
    );
}


{/*<nav>*/}
    {/*<div class="nav-wrapper">*/}
        {/*<a href="#" class="brand-logo">Logo</a>*/}
        {/*<ul id="nav-mobile" class="right hide-on-med-and-down">*/}
            {/*<li><a href="sass.html">Sass</a></li>*/}
            {/*<li><a href="badges.html">Components</a></li>*/}
            {/*<li><a href="collapsible.html">JavaScript</a></li>*/}
        {/*</ul>*/}
    {/*</div>*/}
{/*</nav>*/}
