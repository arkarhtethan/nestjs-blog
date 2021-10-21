import React from 'react'
import Search from '../search'
import Category from './category'
import Tags from './tags'
import TagItem from './tags/tagItem';

export default function PostDetails () {
    const post = {
        id: 1,
        title: "Learning Javascript",
        coverImage: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur officia aliquam tempora, nostrum omnis corporis optio porro facilis maiores? Eius enim optio voluptatibus nulla ea. Blanditiis, cupiditate in aperiam hic neque, animi rerum dolor debitis iusto itaque commodi sed non.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur officia aliquam tempora, nostrum omnis corporis optio porro facilis maiores? Eius enim optio voluptatibus nulla ea. Blanditiis, cupiditate in aperiam hic neque, animi rerum dolor debitis iusto itaque commodi sed non."
    };

    return (
        <div className="flex mx-8">
            <div className="mr-2 flex-grow w-1/2 mb-4">
                <img src={post.coverImage} alt={post.title} className="w-full h-1/2" />
                <div className=" mt-3">
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    <p className="text-justify">
                        {post.description}
                    </p>
                    <div className="my-3">
                        <p className="text-xs text-gray-500 font-bold">Oct 19, 2021</p>
                        <div className="flex mt-3">
                            <svg class="svg-icon" viewBox="0 0 20 20" className="text-sm w-4 mr-2 text-black">
                                <path d="M17.35,2.219h-5.934c-0.115,0-0.225,0.045-0.307,0.128l-8.762,8.762c-0.171,0.168-0.171,0.443,0,0.611l5.933,5.934c0.167,0.171,0.443,0.169,0.612,0l8.762-8.763c0.083-0.083,0.128-0.192,0.128-0.307V2.651C17.781,2.414,17.587,2.219,17.35,2.219M16.916,8.405l-8.332,8.332l-5.321-5.321l8.333-8.332h5.32V8.405z M13.891,4.367c-0.957,0-1.729,0.772-1.729,1.729c0,0.957,0.771,1.729,1.729,1.729s1.729-0.772,1.729-1.729C15.619,5.14,14.848,4.367,13.891,4.367 M14.502,6.708c-0.326,0.326-0.896,0.326-1.223,0c-0.338-0.342-0.338-0.882,0-1.224c0.342-0.337,0.881-0.337,1.223,0C14.84,5.826,14.84,6.366,14.502,6.708"></path>
                            </svg>
                            <TagItem>
                                <p className="text-xs">best-practices</p>
                            </TagItem>
                            <TagItem>
                                intermediate
                            </TagItem>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-3 w-1/4">
                <Search />
                <Category />
                <Tags />
            </div>
        </div>
    )
}
