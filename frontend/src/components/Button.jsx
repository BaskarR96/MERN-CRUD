import React from 'react'

const Button = (
    {
        type,
        className,
        name = '',
        onClick,
        children
    }
) => {
    return (
        <button
            type={type}
            className={className}
            name={name}
            onClick={onClick ? onClick : () => null}
        >
            {children}
        </button>
    )
}

export default Button