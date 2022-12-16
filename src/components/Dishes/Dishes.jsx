import React, { useState, useEffect } from "react";
import { Container, Nav, Dropdown, Button, Navbar, Form } from "react-bootstrap";
import DishesList from "./DishesList";
import "./dishes.css";
import { FcRating, FcShop, FcLike } from "react-icons/fc";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/firebaseContext";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  deleteRestaurantsUser,
  deleteAllRestaurantsUser,
} from "../../features/restaurants/restaurantUserSlice";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineRedo,
  AiOutlineUser,
} from "react-icons/ai";
import { FcCellPhone, FcManager } from "react-icons/fc";

export const Dishes = ({ restaurantsObject: objectRestaurant }) => {
  const navigate = useNavigate();
  const selectedRestaurant = useSelector((state) => state.restaurantsUser);
  const [arrayDish, setArrayDish] = useState(null);
  const { user, logout, loading, findDishes } = useAuth();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  let [idRest, setIdRest] = useState();

  function mapearRestaurant() {
    selectedRestaurant.map((rest) => (idRest = rest.id));
  }

  //Evento para manejar el logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  //Evento en el boton que lleva al perfil de usuario
  const handleUserProfile = () => {
    setError("");
    try {
      navigate("/userprofile");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBack = (idRestaurant) => {
    setError("");
    try {
      dispatch(deleteAllRestaurantsUser());
    } catch (error) {
      setError(error.message);
    }
    navigate("/");
  };

  const handleCreateOrder = () => {
    navigate("/order");
  };

  useEffect(() => {
    //Retornar el listado de platos
    try {
      mapearRestaurant();
      async function fetchDishes() {
        const dishesFetch = await findDishes(idRest);
        setArrayDish(dishesFetch);
      }
      fetchDishes();
    } catch (error) {
      console.error(error);
    }
  }, []);

  //Loading
  if (loading)
    return (
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  return (
    <Container className="dishes_container">
      {/* <Navbar bg="light" expand="lg" fixed="bottom">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">
                <AiOutlineHome />
              </Nav.Link>
              <Nav.Link href="/search">
                <AiOutlineSearch />
              </Nav.Link>
              <Nav.Link href="/order">
                <AiOutlineRedo />
              </Nav.Link>
              <Nav.Link href="/userprofile">
                <AiOutlineUser />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      {/* Datos del usuario */}
      <header className='header_home'>
               
                <picture>
                    <img src="https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/Others%2FLogo_final__1_-removebg-preview.png?alt=media&token=1805d976-f117-4d79-b8bd-17383c6a9866" alt="" />
                </picture>
                <h2>Atienda</h2>
            <div style={{ display:"flex", justifyContent:"flex-end"}}>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <FaUserAlt />  {user.displayName}
                        {/* <img src={user.photoURL} alt="Foto"></img> */}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as="button" onClick={handleUserProfile}>Settings</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={handleLogout}>Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
           
            </header>
      {/* Datos del restaurante */}
      <div className="restaurant_container">
        {selectedRestaurant.map((restaurant) => (
          <>
            <Button variant="light" onClick={() => handleBack(restaurant.id)}>
              <BiArrowBack />
            </Button>
            <div className="container_restaurant">
              <h2 className="h2_text">{restaurant.descripcion}</h2>
              <div key={(idRest = restaurant.id)} className="row">
                <div className="column_left">
                  <img
                    src={restaurant.imagen}
                    alt="restaurant"
                    className="col_img_container"
                  />
                </div>
                <div className="column_right">
                  <p className="desc_text">{restaurant.description}</p>
                  <p>{restaurant.descripcionFull}</p>
                  <p>
                    {" "}
                    <FcManager /> {restaurant.numStars}
                  </p>
                  <p>
                    {" "}
                    <FcCellPhone /> {restaurant.shippingTime}
                  </p>
                </div>
              </div>
            </div>
          </>
        ))}
        <Form.Group className="mb-3" controlId="formBasicFullDescription">
          <Form.Label>Lista de compras *</Form.Label>
          <Form.Control
            required
            name="descripcionFull"
            type="text"
            placeholder="Ingrese aquí su lista de compras"
            as="textarea"
            rows={4}
          />
        </Form.Group>
        {arrayDish ? <DishesList arrayDish={arrayDish} /> : null}
      </div>
    </Container>
  );
};
export default Dishes;
