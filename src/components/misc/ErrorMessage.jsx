import React from 'react';

function ErrorMessage (props) {

    return(
        <div className="error-message">
            <span>{props.msg}</span>
            <button onClick={props.clearError}><b>X</b></button>
        </div>
    )
}

export default ErrorMessage;