import React from 'react';

export default function ({title, className, onClick}) {
    return (
        <button className={className} onClick={onClick}>
            {title}
        </button>
    );
}