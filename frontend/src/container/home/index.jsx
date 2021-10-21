import React from 'react'
import Category from '../../components/post/category'
import PostForm from '../../components/post/postForm'
import PostList from '../../components/post/postList'
import Tags from '../../components/post/tags'
import Search from '../../components/search'

export const Home = () => {
    return (
        <div className="flex mx-4 ">
            <div className="w-1/4">
                <Category />
            </div>
            <div className="mx-6 w-5/6">
                <div className="mx-24">
                    <PostForm />
                    <PostList />
                </div>
            </div>
            <div className="flex flex-col w-1/3">
                <Search />
                <Tags />
            </div>
        </div>
    )
}
