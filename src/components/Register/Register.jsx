import { useState } from 'react';
import { Form, Button, Stack, Container }  from 'react-bootstrap';
import '../Login/login.css';
import logo from '../../logo.svg';  
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useAuth } from '../../context/firebaseContext';
import { useNavigate } from 'react-router-dom';

export function Register() {

    const [ user, setUser ] = useState({
        email: "",
        password: ""
    });
    const { signup, loginWithGoogle, loginWithFacebook } = useAuth();
    const navigate = useNavigate();
    const [ error, setError ] = useState();

    const handleChange = ({target: {name, value}}) => 
        setUser({...user, [name]: value})

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try{
            await signup(user.email, user.password);
            navigate("/");
        } catch (error) {
            if(error.code === "auth/internal-error"){
                setError('Correo invalido')
            }else{
                setError(error.message);
            }
        }
    }

    //Evento en el boton Login
    const handleLogin = () => {
        setError('');
        try{
            navigate("/login");
        } catch (error) {
            setError(error.message);
        }
    }

    //Login with Google
    const handleGoogleSignup = async () => {
        try{ 
            await loginWithGoogle();
            navigate("/");
        }catch(error){
            setError(error.message);
        }
    }
    
    //Login with Facebook
    const handleFacebookSignup = async () => {
        try{ 
            await loginWithFacebook();
            navigate("/");
        }catch(error){
            setError(error.message);
        }
    }

    return (
        <Container className="login_container">
            <header className='header_home'>
               <div className='logo_container'>
               <picture>
                    <img src="https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/Others%2FLogo_final__1_-removebg-preview.png?alt=media&token=1805d976-f117-4d79-b8bd-17383c6a9866" alt="" />
                </picture>
                <h1>Atienda</h1>
                <h5> Su tienda favorita en casa</h5>
               </div>
           
            </header>
            <Stack gap={3}>
                <img src="https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/ConfirmImg%2Flogo%20principal.png?alt=media&token=e62b189d-5d93-49fb-ac51-64598b8c03b5" className="img-responsive center-block d-block mx-auto" alt="imagen_logo"></img>
                <h2 className = "main_text">Registrarse</h2>
                <p className = "second_text">Crear una cuenta</p>
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Correo *</Form.Label>
                        <Form.Control required name="email" type="email" placeholder="correo@mail.com" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña *</Form.Label>
                        <Form.Control required name="password" type="password" placeholder="******" onChange={handleChange}/>
                    </Form.Group>
                    
                    <Button variant="info" type="submit" style={{ width: "51%", float: "right"}}>Regístrate</Button>
                </Form>
                <p className='error-text'>{error && <p>{error}</p> }</p>

                <div className="buttons">
                    
                    <Button variant="light" type="submit" style={{ width: "51%", float:"right"}} onClick={handleGoogleSignup}>
                        <FcGoogle /> Registro con Google
                    </Button>

                    <Button variant="light" type="submit" style={{ width: "51%", float:"right", marginTop: "2%"}} onClick={handleFacebookSignup}>
                        <BsFacebook /> Registro con Facebook
                    </Button>

                    <Button 
                    style={{ width: "51%", float:"right", marginTop: "2%"}}
                    variant="secondary" 
                    onClick={handleLogin}>
                        ¿Tienes una cuenta? Ingresa
                    </Button>

                </div>
            </Stack>
        </Container>
        // <div>
        //     {error && <p>{error}</p> }
        //     <form onSubmit={handleSubmit}>
        //         <label htmlFor="email">Email</label>
        //         <input type="email" name="email" placeholder="youremail@company.com" onChange={handleChange}/>

        //         <label htmlFor="password">Password</label>
        //         <input type="password" name="password" id="password" onChange={handleChange} 
        //             placeholder="******"/>

        //         <button>Register</button>
        //     </form>
        // </div>
    )
}
