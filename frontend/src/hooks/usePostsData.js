import { useQuery } from 'react-query';
import { fetchCategories, fetchTags } from '../services/posts.service';

export const useTagsData = () => {
    return useQuery(
        'tags',
        fetchTags,
    );
}

export const useCategoriesData = () => {
    return useQuery(
        'categories',
        fetchCategories,
    );
}