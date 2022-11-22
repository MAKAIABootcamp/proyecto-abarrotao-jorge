import React, {useState, useEffect} from 'react';
import { Container, Nav, Dropdown, Button } from 'react-bootstrap';
import DishesList from './DishesList';
import './dishes.css';
import { FcRating, FcShop, FcLike } from "react-icons/fc";
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/firebaseContext';
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { deleteRestaurantsUser, deleteAllRestaurantsUser } from '../../features/restaurants/restaurantUserSlice';
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from 'react-redux';


export const Dishes = ({restaurantsObject: objectRestaurant} ) => {

    const navigate = useNavigate();
    const selectedRestaurant = useSelector(state => state.restaurants);
    const [ arrayDish, setArrayDish] = useState(null);
    const {user, logout, loading, findDishes} = useAuth();
    const [ error, setError ] = useState();
    const dispatch = useDispatch();
    let [ idRest, setIdRest ] = useState();

    function mapearRestaurant(){
        selectedRestaurant.map(rest => (
            idRest = rest.id
        ));
    }

    //Evento para manejar el logout
    const handleLogout = async () => {
        try{
            await logout();
        }catch(error){
            console.error(error);
        }
    } 

    //Evento en el boton que lleva al perfil de usuario
    const handleUserProfile = () => {
        setError('');
        try{
            navigate("/userprofile");
        } catch (error) {
            setError(error.message);
        }
    }

    const handleBack = (idRestaurant) => {
        setError('');
        try{
            dispatch(deleteAllRestaurantsUser());
         } catch (error) {
             setError(error.message);
         }
         navigate("/");
    }

    const handleCreateOrder = () => {
         navigate("/order");
    }

    useEffect(() => {
        //Retornar el listado de platos
        try{
            mapearRestaurant();
            async function fetchDishes(){
                const dishesFetch = await findDishes(idRest);
                setArrayDish(dishesFetch);
            }
            fetchDishes();
        }catch(error){
            console.error(error);
        }
     }, [ ])

    //Loading
    if(loading) return (
        <div className="spinner-border text-warning"  role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )

    return (
            <Container className='dishes_container'>
                    {/* Datos del usuario */}
                    <div style={{ display:"flex", justifyContent:"flex-end"}}>
                        <Dropdown>
                            <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                <FaUserAlt />  {user.displayName}
                                {/* <img src={user.photoURL} alt="Foto"></img> */}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as="button" onClick={handleUserProfile}>Settings</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={handleLogout}>Sign out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {/* Datos del restaurante */}
                    <div className="restaurant_container">
                        {selectedRestaurant.map(restaurant => (
                            <>
                            <Button variant="light" onClick={() => handleBack(restaurant.id)}><BiArrowBack/></Button> 
                            <div className="container_restaurant">
                                <h2 className="h2_text">{restaurant.descripcion}</h2>
                                <div key={idRest = restaurant.id} className="row">
                                    <div className="column_left">
                                        <img src={restaurant.imagen} alt="restaurant" className="col_img_container"/>
                                    </div>
                                    <div className="column_right">
                                        <p className="desc_text">{restaurant.description}</p>
                                        <p>{restaurant.descripcionFull}</p>
                                        <p><FcRating /> {restaurant.numStars}</p>
                                        <p>{restaurant.shippingTime}</p>
                                    </div>
                                </div>
                            </div>
                            </>
                            ))}
                        {/* Filtros de los platos */}
                        <Nav variant="pills" defaultActiveKey="/home" className="margins">
                            <Nav.Item style={{ backgroundColor:"#C6C642"}}> </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/disheslist">All</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="link-1"><FcShop /> Salates</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="link-2"><FcLike /> Pizza</Nav.Link>
                            </Nav.Item>
                        </Nav> 
                        <div style={{ display:"flex", justifyContent:"flex-end"}}>
                            <Button variant="warning" onClick={handleCreateOrder} >Create Order!</Button>
                        </div>
                        {arrayDish ? <DishesList arrayDish={arrayDish} /> : null}

                    </div>
            </Container>
    )
};
export default Dishes;