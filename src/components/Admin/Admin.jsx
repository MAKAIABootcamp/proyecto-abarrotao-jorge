import React, {useState} from 'react';
import "../Admin/admin.css"
import { useAuth } from '../../context/firebaseContext';
import { Card, Button, Dropdown, CardGroup, Container} from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function Admin() {
  const navigate = useNavigate();
  const [ error, setError ] = useState();
  const {user, logout, loading, findRestaurants} = useAuth();
 
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

  //Evento del boton que lleva la crud de restaurantes
  const handleRestaurants = () => {
    setError('');
        try{
            navigate("/crudrestaurants");
        } catch (error) {
            setError(error.message);
        }
  }

  //Evento del boton que lleva la crud de platos
  const handleDishes = () => {
    setError('');
        try{
            navigate("/cruddishes");
        } catch (error) {
            setError(error.message);
        }
  }

  return (
  <Container className='admin_container'>
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
    <div className="card_container">
      
      {/* <h3 className="admin_title">Welcome to admin profile</h3> */}
      <CardGroup className="cards">
        <Card className="card" style={{borderTopLeftRadius: "10%", borderTopRightRadius: "10%"}}>
          <Card.Img variant="top" style={{borderTopLeftRadius: "10%", borderTopRightRadius: "10%"}} src="https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/AdminImg%2Frestaurant1.jpg?alt=media&token=5f3505cb-068a-46cd-afd9-32a916cb79b0" />
          <Card.Body>
            <Card.Title>Restaurants</Card.Title>
            <Card.Text>
              Here, you can create, view, update, and delete restaurants from
              your app's listing.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button onClick={handleRestaurants} variant="warning">Get in</Button>
          </Card.Footer>
        </Card>
        <Card className="card" style={{borderTopLeftRadius: "10%", borderTopRightRadius: "10%"}}>
          <Card.Img variant="top" style={{borderTopLeftRadius: "10%", borderTopRightRadius: "10%"}} src="https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/AdminImg%2Fdish.jpg?alt=media&token=ac4e8d48-d662-4759-816e-8a7f350db3b0" />
          <Card.Body>
            <Card.Title>Dishes</Card.Title>
            <Card.Text>
              Here, you can create, view, update and delete dishes from your
              app's list.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button onClick={handleDishes} variant="warning">Get in</Button>
          </Card.Footer>
        </Card>
      </CardGroup>
    </div>
    </Container>
  );
}

export default Admin;