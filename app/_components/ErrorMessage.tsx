import React from 'react'

const ErrorMessage = ({ text = "Something went wrong" }: { text?: string }) => {
    return (
        <div>
            {text}
        </div>
    )
};

export default ErrorMessage
