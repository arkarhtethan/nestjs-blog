import React from 'react'
import { Spinner } from '../spinner'

export const SubmitButton = ({ loading, isValid, buttonText }) => {
    return <>
        {
            loading ?
                <button type="submit" className={`bg-black text-white py-2 mb-4 flex justify-center cursor-wait`
                }> <Spinner /> </button > :
                <button type="submit" className={`bg-black text-white py-2 mb-4 ${!isValid && 'cursor-not-allowed bg-gray-600'}`}> {buttonText} </button>}
    </>
}
