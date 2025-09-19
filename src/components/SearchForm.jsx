import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCommonStore } from "../store";

export default function SearchForm(props) {

    const { searchQuery, searchType, setSearchQuery, setSearchType } = useCommonStore()
    const [search, setSearch] = useState(searchQuery)
    const [type, setType] = useState(searchType)

    function submitHandler(e) {
        e.preventDefault()

        const searchString = search.trim().toLowerCase()
        if (searchString === '') return toast.warning("Enter movie name please")
        setSearchQuery(searchString)
        setSearchType(type)
        props.onSearch({ search: searchString, type })
    }

    return (
        <Card>
            <Card.Body>
                <form onSubmit={submitHandler}>
                    <Row>
                        <Col>
                            <Form.Control type='search' value={search} onChange={(e) => setSearch(e.target.value)} />
                        </Col>
                        <Col>
                            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="movie">Movies</option>
                                <option value="tv">TV</option>
                                <option value="person">Person</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Button type="submit">
                                Search
                            </Button>
                        </Col>
                    </Row>
                </form>
            </Card.Body>
        </Card>
    )
}