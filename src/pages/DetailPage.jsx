import { useParams } from "react-router";
import { useState, useEffect } from "react";


export default function DetailPage() {

    const [item, setItem] = useState(null)

    const params = useParams()


   async function fetchData() {
        const url = `https://api.themoviedb.org/3/${params.type}/${params.id}`
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
                setItem(data)
            } else {
                throw new Error(response.status)
            }

        } catch (err) {
            toast.error("Some error ocured!")
        } finally {
        }
    }

    useEffect(() => {
        fetchData()
    }, [params])

    if(!item) return null


    return (
        <h1>{item.title}</h1>
    )
}