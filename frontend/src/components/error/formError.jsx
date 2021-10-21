import React from 'react'

export default function FormError ({ message }) {
    return (
        <small className="mb-3 text-xs text-white font-bold py-2 px-4 bg-red-500">{message}</small>
    )
}

export const ErrorMessage = ({ message }) => (<small className="mb-3 ml-2 text-xs text-red-500">{message}</small>)
