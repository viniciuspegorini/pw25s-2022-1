import React from 'react';

const Input = (props) => {
    let inputClassName = 'form-control';
    if (props.hasError !== undefined) {
        inputClassName += props.hasError ? ' is-invalid' : ' is-valid';
    }

    return (
        <div>
            {props.label && <label>{props.label}</label>}
            <input
                className={inputClassName}
                type={props.type || 'text'}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            {props.hasError && (<div className="invalid-feedback">{props.error}</div>)}
        </div>
    )
}
Input.defaultProps = {
    onChange: () => {}
}
export default Input;