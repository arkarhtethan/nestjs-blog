import React from 'react'

export default function Search () {
    return (
        <div className="flex items-center">
            <form>
                <input type="search" placeholder="eg.python"
                    className="border-black border-2 px-1 mr-1 py-0.5" />
                <button className="text-white bg-black px-2 py-1">Search</button>
            </form>
        </div>
    )
}
