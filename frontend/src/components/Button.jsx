import React from 'react';
import { Bars } from 'react-loader-spinner'

const Button = (
    {
        type,
        name = '',
        id = '',
        className,
        isLoading,
        onClick,
        children,
        dataCustomAttribute,
    }
) => {
    return (
        <button
            type={type}
            name={name}
            id={id}
            className={className}
            disabled={isLoading}
            onClick={onClick ? onClick : () => null}
            data-custom-attribute={dataCustomAttribute}
        >
            {
                isLoading ?
                    <Bars
                        height="20"
                        width="20"
                        color="#fff"
                        ariaLabel="bars-loading"
                        wrapperStyle={{ justifyContent: "center" }}
                        wrapperClass=""
                        visible={true}
                    /> : children
            }
        </button>
    )
}

export default Button