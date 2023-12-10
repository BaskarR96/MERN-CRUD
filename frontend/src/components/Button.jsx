import React from 'react'

const Button = (
    {
        type,
        className,
        onClick,
        children
    }
) => {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick ? onClick : () => null}
        >
            {children}
        </button>
    )
}

export default Button