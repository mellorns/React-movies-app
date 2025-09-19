import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import SearchForm from './../components/SearchForm';
import SearchResult from './../components/SearchResult';
import { delay } from './../helpers';
import LoaderOverlay from './../components/LoaderOverlay';
import { toast, ToastContainer } from 'react-toastify';
import useStorage from './../hooks/useStorage'
import { createContext } from 'react';
import CustomPagination from '../components/customPagination';
import { useCommonStore } from '../store';

export const TypeContext = createContext()

function App() {

    const state = useCommonStore()

    const [movieList, setMovieList] = useState(state.moviesList)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(state.totalPages)
    const [totalItems, setTotalItems] = useState(state.totalResults)
    const [inProgress, setInProgress] = useState(false)
    const [type, setType] = useState(state.searchQuery)
    const [search, setSearch] = useState(state.type)

    const { getStorageItem, setStorageItem } = useStorage()



    const searchHandler = (params) => {
        setType(params.type)
        setSearch(params.search)
        searchMovie(params.search, params.type, page)
    }

    const pageHandler = (newPage) => {
        setPage(newPage)
        searchMovie(search, type, newPage)
    }

    const searchMovie = async (search, type, page) => {


        setInProgress(true)

        const storeKey = search.replaceAll(' ', '-') + '_' + type + '_' + page
        const cashedList = getStorageItem(storeKey, null, 'session')


        if (cashedList) {
            setMovieList(cashedList.results)
            setTotalItems(cashedList.total_results)
            setTotalPages(cashedList.total_pages)

            state.setMoviesList(cashedList.results)
            state.setTotalPages(cashedList.total_pages)
            state.setTotalResults(cashedList.total_results)
            setInProgress(false)
            return
        }


        const url = `https://api.themoviedb.org/3/search/${type}?include_adult=false&language=en-US&page=${page}&query=${search}`


        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: "Bearer " + import.meta.env.VITE_TMDB_API_TOKEN
            }
        };

        try {
            const response = await fetch(url, options)
            if (response.ok) {
                const data = await response.json()
                data.total_results && setStorageItem(storeKey, data, 'session')
                data.total_results && setStorageItem('storeKey', storeKey, 'session')
                setMovieList(data.results)
                setTotalItems(data.total_results)
                setTotalPages(data.total_pages)

                state.setMoviesList(data.results)
                state.setTotalPages(data.total_pages)
                state.setTotalResults(data.total_results)
            } else {
                throw new Error(response.status)
            }

        } catch (err) {
            toast.error("Some error ocured!")
        } finally {
            await delay(1000)
            setInProgress(false)
        }
    }



    function storedSearch() {

        const storeKey = getStorageItem('storeKey', null, 'session')

        if (storeKey) {
            const cashedList = getStorageItem(storeKey, null, 'session')
            if (cashedList) {
                setMovieList(cashedList.results)
                setTotalItems(cashedList.total_results)
                setTotalPages(cashedList.total_pages)
                setInProgress(false)
                const [search, type, page] = storeKey.split('_')
                setType(type)
                setSearch(search)
                setPage(page)

                return
            }
        }
    }

    useEffect(() => {
        storedSearch()
    }, [])

    return (
        <>
            <TypeContext value={type} >
                {inProgress && <LoaderOverlay />}
                <Container className='container'>
                    <SearchForm onSearch={searchHandler} />
                    <SearchResult movies={movieList} total={totalItems} />
                    <CustomPagination page={page} total={totalPages} onPageChange={pageHandler} />
                </Container>
                <ToastContainer position="top-center" />
            </TypeContext>
        </>
    )
}

export default App
