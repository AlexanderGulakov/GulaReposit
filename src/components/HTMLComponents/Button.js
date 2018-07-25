import React from 'react';

export default function ({title, className, onClick, type}) {
    return (
        <button className={className} onClick={onClick} type={type}>
            {title}
        </button>
    );
}