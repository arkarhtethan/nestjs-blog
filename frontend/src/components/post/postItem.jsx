import React from 'react'
import { Link } from 'react-router-dom'

export default function PostItem ({ post: { title, description, coverImage, id } }) {
    const postDetailLink = `/post/${id}`;
    return (
        <div className="flex border-black p-2 border-2">
            <img src={coverImage} alt={title} className=" bg-cover w-1/4 mr-2" />
            <div className="flex flex-col">
                <Link to={postDetailLink} className="hover:underline font-bold mb-3 text-xl">{title}</Link>
                <p className="text-sm flex-grow">
                    {description.substring(0, 200)}
                </p>
                <Link to={postDetailLink} className="text-xs font-bold hover:underline ">
                    Read More >>
                </Link>
            </div>
        </div>
    )
}
