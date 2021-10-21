
export const useTagsData = () => {
    return useQuery(
        'tags',
        fetchTags,
    );
}
