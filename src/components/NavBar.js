


import React from 'react';
export default function ({titlesAndLinks}) {
    return (
        <nav className={"nav"}>
            <div className={"container"}>
                {/*<a href={titlesAndLinks[0].href}>{titlesAndLinks[0].title}</a>*/}
                <ul>
                    <li><a href={titlesAndLinks[1].href}>{titlesAndLinks[1].title}</a></li>
                    <li><a href={titlesAndLinks[2].href}>{titlesAndLinks[2].title}</a></li>
                    <li><a href={titlesAndLinks[3].href}>{titlesAndLinks[3].title}</a></li>

                </ul>
            </div>
        </nav>
    );
}
