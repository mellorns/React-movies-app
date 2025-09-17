import { useState } from 'react'
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

export const TypeContext = createContext()

function App() {

    const [movieList, setMovieList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [inProgress, setInProgress] = useState(false)
    const [type, setType] = useState('')
    const [search, setSearch] = useState('')

    const { getItem, setItem } = useStorage()


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

        const storeKey = search.replaceAll(' ', '_') + '_' + type + '_' + page

        const cashedList = getItem(storeKey)

        if (cashedList) {
            setMovieList(cashedList.results)
            setTotalItems(cashedList.total_results)
            setTotalPages(cashedList.total_pages)
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
                setItem(storeKey, data)
                setMovieList(data.results)
                setTotalItems(data.total_results)
                setTotalPages(data.total_pages)
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
