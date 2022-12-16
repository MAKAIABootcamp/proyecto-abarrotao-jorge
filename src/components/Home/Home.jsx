import React, {useState, useEffect} from 'react';
import  {getAuth, signOut} from "firebase/auth";
import { Container, Button, DropdownButton, Dropdown, Navbar, Nav } from "react-bootstrap";
import RestaurantListHeader from '../Restaurant/RestaurantListHeader';
import RestaurantList from '../Restaurant/RestaurantList';
import DishesList from '../Dishes/Dishes';
import { useNavigate } from 'react-router-dom';
import { ref, getStorage, listAll, getDownloadURL } from "firebase/storage";
import { useAuth } from '../../context/firebaseContext';
import { FaUserAlt, } from "react-icons/fa";
import './home.css';
import { AiOutlineHome, AiOutlineSearch, AiOutlineRedo, AiOutlineUser } from "react-icons/ai";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";



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
            navigate("/");
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
            <header className='header_home'>
               <div className='logo_container'>
               <picture>
                    <img src="https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/Others%2FLogo_final__1_-removebg-preview.png?alt=media&token=1805d976-f117-4d79-b8bd-17383c6a9866" alt="" />
                </picture>
                <h1>Atienda</h1>
                <h5> Tu tienda favorita en casa</h5>
               </div>
                
            <div style={{ display:"flex", justifyContent:"flex-end"}}>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <FaUserAlt />  {user.displayName}
                        {/* <img src={user.photoURL} alt="Foto"></img> */}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as="button" onClick={handleUserProfile}>Ir a inicio</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={handleLogout}>Salir</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
           
            </header>

                {/* <Navbar bg="light" expand="lg" fixed="bottom">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/"><AiOutlineHome /></Nav.Link>
                            <Nav.Link href="/search"><AiOutlineSearch /></Nav.Link>
                            <Nav.Link href="/order"><AiOutlineRedo /></Nav.Link>
                            <Nav.Link href="/userprofile"><AiOutlineUser /></Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar> */}
            {/* Datos del usuario */}
            

            {/* Render del header */}
            <RestaurantListHeader />

            {/* Render del listado de restaurantes */}
            {arrayRestaurant ? <RestaurantList arrayRestaurant={arrayRestaurant} /> : null}
            <footer className='footer_home'>
                <h5>Síguenos en redes sociales: <SiFacebook/> <SiInstagram/> <SiWhatsapp/></h5>
            </footer>
        </Container>
    );
};