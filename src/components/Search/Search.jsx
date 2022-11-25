import { useState } from 'react';
import { Container, Form, InputGroup, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';


export const Search = () => {

    const [search, setSearch ] = useState('');
    const selectedRestaurant = useSelector(state => state.restaurants);

    return (
        <div>
            <Container>
                <h1 className='text-center mt-4'>Restaurant search</h1>
                <Form>
                    <InputGroup className='my-3'>
                        <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search restaurants' />
                    </InputGroup>
                </Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Work time</th>
                            <th>Rating</th>
                            <th>Before you</th>
                            <th>Shipping Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedRestaurant.filter((restaurant) => {
                            return search.toLowerCase() === '' ? restaurant : restaurant.descripcionFull.toLowerCase().includes(search);
                        }).map((restaurant) => (
                            <tr key={restaurant.id}>
                                <td><img src={restaurant.imagen} style={{borderRadius:"10%", width:"70%", height:"70%"}} alt="dish"/></td>
                                <td><b>{restaurant.descripcion}</b></td>
                                <td>{restaurant.descripcionFull}</td>
                                <td>{restaurant.workTime}</td>
                                <td>{restaurant.numStars}</td>
                                <td>{restaurant.beforeyou}</td>
                                <td>{restaurant.shippingTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}