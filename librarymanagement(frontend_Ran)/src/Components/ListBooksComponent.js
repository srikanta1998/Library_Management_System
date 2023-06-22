import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
const ListBookComponent = () => {

    const [books, setBooks] = useState([]);
    const [tempbooks, setTempBooks] = useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkLoginStatus = () => {
            const isLoggedInUser1 = localStorage.getItem('isLoggedIn1') === 'true';
            const isLoggedInUser2 = localStorage.getItem('isLoggedIn2') === 'true';
            // if (location.state.role === 'admin') {
            //     setIsLoggedIn(isLoggedInUser2);
            // } else {
            //     setIsLoggedIn(isLoggedInUser1);
            // }

        };
        checkLoginStatus();
    }, []);

    const navigatepage = () => {
        if (location.state.role === 'admin') {
            navigate('/adminloginpage');
        } else {
            navigate('/userloginpage');
        }
    };

    useEffect(() => {
        const fetchBookDetails = async () => {

            try {
                const response = await axios.get(`http://localhost:9001/api/v2/allbooks`);
                const book = response.data;
                setTempBooks(book);
                setBooks(book);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBookDetails();
    }, []);

    const handleSearchInput = (e) => {
        let value = e.nativeEvent.data;
        if (isNaN(value) && value != '') {
            let data = tempbooks.filter((e) => e.title.includes(value));
            setBooks(data);
        } else if (value != '' && value != null && value != undefined) {
            let data = books.filter((e) => e.book_id.toString().includes(value));
            setBooks(data);
        } else {
            setBooks(tempbooks);
        }


    }

    useEffect(() => { }, [books]);

    return (
        <div className='App2'>
            <div>

                <>
                    <h1>Books List</h1><hr />
                    <Container>
                        <Row>
                            <InputGroup size="sm">

                                <Form.Control

                                    aria-label="Search with id or title"
                                    aria-describedby="inputGroup-sizing-sm"
                                    onChange={handleSearchInput}
                                />
                            </InputGroup>

                        </Row>
                        <Row>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Book ID</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Author</th>
                                        <th scope="col">Sub</th>
                                        <th scope="col">Isbn</th>
                                        <th scope="col">Publisher</th>
                                        <th scope="col">Publication Date</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Available Quantity</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {books.map((demo) => (
                                        <tr key={demo.book_id}>
                                            <th scope="row">{demo.book_id}</th>
                                            <td>{demo.title}</td>
                                            <td>{demo.author}</td>
                                            <td>{demo.sub}</td>
                                            <td>{demo.isbn}</td>
                                            <td>{demo.publisher}</td>
                                            <td>{demo.publication_date}</td>
                                            <td>{demo.quantity}</td>
                                            <td>{demo.available_quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Row>
                    </Container>
                </>
            </div>
        </div>
    );
}
export default ListBookComponent;