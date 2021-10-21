import React from 'react'
import { Link } from 'react-router-dom';

export default function TagItem ({ children, tag }) {
    return (
        <Link to={`/posts/tag/${tag.slug}`}>
            <div className="cursor-pointer  hover:bg-gray-800 bg-black mx-2 text-white p-2 mb-2 rounded-full text-xs">
                {children}
            </div>
        </Link>
    )
}
