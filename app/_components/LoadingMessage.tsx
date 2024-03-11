import React from 'react'

const LoadingMessage = ({ text = "Loading..." }: { text?: string }) => {
    return (
        <div>
            {text}
        </div>
    )
};

export default LoadingMessage
