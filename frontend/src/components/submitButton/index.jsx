import React from 'react'
import { Spinner } from '../loader'
import SolidButton from './ solidButton'

export const SubmitButton = ({ loading, isValid, buttonText }) => {
    return <>
        {
            loading ?
                <button type="submit" className={`bg-black text-white py-2 mb-4 flex justify-center cursor-wait`
                }> <Spinner /> </button > :
                <SolidButton type="submit" classes={`mb-4 ${!isValid && 'cursor-not-allowed bg-gray-600'}`} text={buttonText} />}
    </>
}
