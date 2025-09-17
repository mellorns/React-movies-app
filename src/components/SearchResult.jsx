import ResultItem from "./ResultItem";

export default function SearchResult({ movies, total }) {
    return (
        <>
            <div>Search Results: {total}</div>
            <div className="movies-list">
                {movies.map((movie, index) => {
                    return <ResultItem movie={movie} key={movie.id} />
                })}
            </div>
        </>
    )
}