import React from 'react'
import TagItem from './tagItem';
import { useQuery } from 'react-query';
import { fetchTags } from '../../../services/posts.service';
import { ErrorMessage } from '../../error/formError';
import { DotLoader } from '../../loader';

export default function Tags () {
    const { data, isLoading, isError, error } = useQuery('tags', fetchTags, {
        refetchOnWindowFocus: false,
    });

    if (data && data.data.tags) {
        console.log(data?.data.tags)
    }

    return (
        <div className="my-2 border-2 border-black p-4">
            <h3 className="border-black border-b-2">Tags</h3>
            <div className="flex flex-wrap mt-3 w-full justify-center">
                {isLoading && <div className="">
                    <DotLoader />
                </div>}
                {(isError && error) && <ErrorMessage message={error?.message} />}
                {data && data.data.tags && data.data.tags.map((tag) => <TagItem tag={tag} key={tag.id}> {tag.name}
                </TagItem>)}
            </div>
        </div >
    )
}
