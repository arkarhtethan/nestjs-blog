import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";


export const Spinner = () => {
    return (
        <Loader
            type="Oval"
            color="#fff"
            height={20}
        />
    )
}


export const DotLoader = () => <Loader type="ThreeDots" color="#000" height={80} width={80} />