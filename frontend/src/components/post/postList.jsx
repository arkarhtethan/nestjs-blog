import React, { useState } from 'react'
import Pagination from 'react-js-pagination'
import PostItem from './postItem'

export default function PostList () {
    const handlePageChange = (data) => {
        console.log(data);
        setActivePage(data);
    }
    const [activePage, setActivePage] = useState(1);
    const posts = [
        {
            id: 1,
            title: "Learning Javascript",
            coverImage: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur officia aliquam tempora, nostrum omnis corporis optio porro facilis maiores? Eius enim optio voluptatibus nulla ea. Blanditiis, cupiditate in aperiam hic neque, animi rerum dolor debitis iusto itaque commodi sed non.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur officia aliquam tempora, nostrum omnis corporis optio porro facilis maiores? Eius enim optio voluptatibus nulla ea. Blanditiis, cupiditate in aperiam hic neque, animi rerum dolor debitis iusto itaque commodi sed non."
        },
        {
            id: 2,
            title: "Learning Javascript",
            coverImage: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur officia aliquam tempora, nostrum omnis corporis optio porro facilis maiores? Eius enim optio voluptatibus nulla ea. Blanditiis, cupiditate in aperiam hic neque, animi rerum dolor debitis iusto itaque commodi sed non.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur officia aliquam tempora, nostrum omnis corporis optio porro facilis maiores? Eius enim optio voluptatibus nulla ea. Blanditiis, cupiditate in aperiam hic neque, animi rerum dolor debitis iusto itaque commodi sed non."
        },
        {
            id: 3,
            title: "Learning Javascript",
            coverImage: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur officia aliquam tempora, nostrum omnis corporis optio porro facilis maiores? Eius enim optio voluptatibus nulla ea. Blanditiis, cupiditate in aperiam hic neque, animi rerum dolor debitis iusto itaque commodi sed non.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur officia aliquam tempora, nostrum omnis corporis optio porro facilis maiores? Eius enim optio voluptatibus nulla ea. Blanditiis, cupiditate in aperiam hic neque, animi rerum dolor debitis iusto itaque commodi sed non."
        }, {
            id: 11,
            title: "Learning Javascript",
            coverImage: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur officia aliquam tempora, nostrum omnis corporis optio porro facilis maiores? Eius enim optio voluptatibus nulla ea. Blanditiis, cupiditate in aperiam hic neque, animi rerum dolor debitis iusto itaque commodi sed non.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur officia aliquam tempora, nostrum omnis corporis optio porro facilis maiores? Eius enim optio voluptatibus nulla ea. Blanditiis, cupiditate in aperiam hic neque, animi rerum dolor debitis iusto itaque commodi sed non."
        }
    ]
    return (
        <>
            <div className="flex flex-wrap space-y-2 mb-2">
                {posts.map(post => <PostItem key={post.id} post={post} />)}
            </div>
            <div className="my-24">
                <Pagination
                    innerClass="flex pl-0 rounded list-none flex-wrap justify-center"
                    itemClass="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-gray-500 bg-white text-gray-500"
                    activePage={activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                />

            </div>
        </>
    )
}
