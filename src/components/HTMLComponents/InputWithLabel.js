import React, { Fragment } from 'react';
import { string, func } from 'prop-types'

export default function InputWithLabel({ label, className,value, title, onInputChange, type,error }) {
    return (
        <Fragment>
            <label>{label}
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
            </label>
            <br/>
        </Fragment>);
};

InputWithLabel.propTypes = {

    title: string.isRequired,
    error: string,
    type: string,
    onInputChange: func.isRequired
};

InputWithLabel.defaultProps = {
    type: 'text',
    error: ''
};