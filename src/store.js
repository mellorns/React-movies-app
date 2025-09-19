import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


export const useCommonStore = create(devtools((set) => ({
    moviesList: [],
    totalPages: 0,
    totalResults: 0,
    searchQuery: '',
    searchType: 'movie',
    setMoviesList: (movieList) => set({moviesList: movieList}),
    setTotalPages: (totalPages) => set({totalPages: totalPages}),
    setTotalResults: (totalResults) => set({totalResults: totalResults}),
    setSearchQuery: (searchQuery) => set({searchQuery: searchQuery}),
    setSearchType: (searchType) => set({searchType: searchType}),
})))