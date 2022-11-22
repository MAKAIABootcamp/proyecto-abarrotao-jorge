import React, {useState, useEffect} from 'react';
import  {getAuth, signOut} from "firebase/auth";
import { Container, Button, DropdownButton, Dropdown} from "react-bootstrap";
import RestaurantListHeader from '../Restaurant/RestaurantListHeader';
import RestaurantList from '../Restaurant/RestaurantList';
import DishesList from '../Dishes/Dishes';
import { useNavigate } from 'react-router-dom';
import { ref, getStorage, listAll, getDownloadURL } from "firebase/storage";
import { useAuth } from '../../context/firebaseContext';
import { FaUserAlt } from "react-icons/fa";
import './home.css';


export const Home = ({ emailUser: emailUser }) => {

    const navigate = useNavigate();
    const [ error, setError ] = useState();
    const {user, logout, loading, findRestaurants} = useAuth();
    const [ arrayRestaurant, setArrayRestaurant] = useState(null);

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

    useEffect(() => {
        //Retornar el listado de restaurantes
        async function fetchRestaurants(){
            const restaurantsFetch = await findRestaurants();
            setArrayRestaurant(restaurantsFetch);
        }
        fetchRestaurants();
     }, [ ])

    //Loading
    if(loading) return (
        <div className="spinner-border text-warning"  role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )

    return (
        <Container className='home_container'>
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

            {/* Render del header */}
            <RestaurantListHeader />

            {/* Render del listado de restaurantes */}
            {arrayRestaurant ? <RestaurantList arrayRestaurant={arrayRestaurant} /> : null}
        </Container>
    );
};
