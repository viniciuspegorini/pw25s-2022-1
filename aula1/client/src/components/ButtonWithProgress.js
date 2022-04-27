import React from 'react';

const ButtonWithProgress = (props) => {
    return (
        <button 
            className={props.className || 'btn btn-primary'}
            disabled={props.disabled}
            onClick={props.onClick}
          >
            {props.pendingApiCall && (
              <div className="spinner-border text-light spinner-border-sm mr-sm-1"
                role="status">
                <span className="visually-hidden">Aguarde...</span>
              </div>
            )}
            {props.text}
          </button>
    );
}
export default ButtonWithProgress;