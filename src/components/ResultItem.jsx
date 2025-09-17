import { Button, Card } from "react-bootstrap";
import noImg from './../assets/images/No_Image_Available.jpg'
import { formatDate } from "../helpers";
import { useContext } from "react";
import { NavLink } from "react-router";
import { TypeContext } from "../pages/HomePage";


export default function ResultItem({ movie }) {

    const type = useContext(TypeContext)

    let title = '', imgSrc = '', date = ''

    switch (type) {
        case 'movie':
            title = movie.title;
            date = movie.release_date
            imgSrc = movie.poster_path ? "https://image.tmdb.org/t/p/w500" + movie.poster_path : noImg
            break
        case 'tv':
            title = movie.name;
            date = movie.release_date
            imgSrc = movie.poster_path ? "https://image.tmdb.org/t/p/w500" + movie.poster_path : noImg
            break
        case 'person':
            title = movie.name;
            date = null
            imgSrc = movie.poster_path ? "https://image.tmdb.org/t/p/w500" + movie.profile_path : noImg
            break
        default:
            null
    }

    return (
        <Card key={movie.id}>
            <Card.Img variant="top" src={imgSrc} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {date && <time dateTime={date}>{formatDate(date)}</time> || movie.known_for_department}   
                </Card.Text>
                <NavLink to={`/detail/${type}/${movie.id}`} className="btn btn-info">Detail</NavLink>
            </Card.Body>
        </Card>
    )

}
