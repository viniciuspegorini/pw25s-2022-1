import React from 'react';

const ButtonWithProgress = (props) => {
    return (
        <button 
            className={props.className || 'btn btn-primary'}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.pendingApiCall && (
                <div className="spinner-border text-light-spinner spinner-border-sm mr-sm-1"
                    role="status">
                    <span className="visually-hidden">Aguarde...</span>
                </div>
            )}
            {props.text}
        </button>
    );
};
export default ButtonWithProgress;