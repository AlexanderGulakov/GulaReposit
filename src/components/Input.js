import React, { Fragment } from 'react';
import { string, func } from 'prop-types'

export default function Input({ className,value, title, onInputChange, type,error }) {
    return (
        <Fragment>

            <br />
            <input
                className={className}
                value={value}
                onChange={(e) => {
                    onInputChange(e.target.value);
                }}
                type={type}
                placeholder={title}
            />
            {error && <span style={{ color: 'red',font: '12px Arial,sans-serif' }}>{error}</span>}
            <br />
        </Fragment>);
};

Input.propTypes = {
    value: string.isRequired,
    title: string.isRequired,
    error: string,
    type: string,
    onInputChange: func.isRequired
};

Input.defaultProps = {
    type: 'text',
    error: ''
};