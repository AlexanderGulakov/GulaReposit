import React, { Fragment } from 'react';
import { string, func } from 'prop-types'

export default function Input({ className,value, title, onInputChange, type }) {
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
            <br />
        </Fragment>);
};

Input.propTypes = {
    value: string.isRequired,
    title: string.isRequired,
    type: string,
    onInputChange: func.isRequired
};

Input.defaultProps = {
    type: 'text'
};