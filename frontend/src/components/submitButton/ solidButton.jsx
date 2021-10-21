import React from 'react'

export default function SolidButton ({ onClick, text, type = "button", classes }) {
    return (
        <button type={type} onClick={onClick} className={`${classes} bg-black text-white py-2 `}>
            {text}
        </button>
    )
}
