import { useState } from 'react';
import { Form, Button, Stack, Container }  from 'react-bootstrap';
import './login.css';
import logo from '../../logo.svg';  
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useAuth } from '../../context/firebaseContext';
import { useNavigate } from 'react-router-dom';


export function Login() {

    const [ user, setUser ] = useState({
        email: "",
        password: ""
    });
    const { login, loginWithGoogle, loginWithFacebook, resetPassword } = useAuth();
    const navigate = useNavigate();
    const [ error, setError ] = useState();

    //Evento cuando ingresa correo y password
    const handleChange = ({ target: { value, name } }) =>
        setUser({ ...user, [name]: value });

    //Evento de botón Sign in
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try{
            const userRole = await login(user.email, user.password);
            if (userRole  === "user") {
                navigate("/");
            } else {
                navigate("/admin");
            }
            
        } catch (error) {
            if(error.code === "auth/internal-error"){
                setError('Invalid e-mail');
            }if(error.code === "auth/invalid-email"){
                setError('The account is not registered');
            }if(error.code === "auth/wrong-password"){
                setError('Wrong password');
            }if(error.code === "auth/user-not-found"){
                setError('User not found');
            }else{
                setError(error.message);
            }
        }
    }

    //Evento en el boton Registrarse
    const handleRegister = () => {
        setError('');
        try{
            navigate("/register");
        } catch (error) {
            setError(error.message);
        }
    }
    
    //Login with Google
    const handleGoogleSignin = async (e) => {
        e.preventDefault();
        setError('');
        try{ 
            await loginWithGoogle();
            navigate("/");
        }catch(error){
            setError(error.message);
        }
    }

    //Login with Facebook
    const handleFacebookSignin = async (e) => {
        e.preventDefault();
        setError('');
        try{ 
            await loginWithFacebook();
            navigate("/");
        }catch(error){
            setError(error.message);
        }
    }

    //Reset password
    const handleResetPassword = async () => {
        setError('');
        if(!user.email) return setError("Please enter your e-mail");
        try{
            await resetPassword(user.email);
            setError('We sent you an e-mail with a link to reset your password');
        }catch(error){
            setError(error.message);
        }
    }

    return (
        <Container className="login_container">
            <Stack gap={3}>
                <img src="https://firebasestorage.googleapis.com/v0/b/sprint4-61808.appspot.com/o/ConfirmImg%2Flogo%20principal.png?alt=media&token=e62b189d-5d93-49fb-ac51-64598b8c03b5" className="img-responsive center-block d-block mx-auto" alt="imagen_logo"></img>
                <h2 className = "main_text">Ingresar</h2>
                <p className = "second_text">Ingresa con tu cuenta</p>
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Correo *</Form.Label>
                        <Form.Control required name="email" type="email" placeholder="correo@mail.com" 
                            onChange={handleChange}  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Contraseña *</Form.Label>
                        <Form.Control required type="password" name="password" placeholder="******" 
                            onChange={handleChange} />
                    </Form.Group>
                    <Button variant="info" type="submit" style={{ width: "51%", float: "right"}}>Ingresar</Button>
                </Form>
                
                <div className='error-text'>{error && <p>{error}</p> }</div>

                <a className='forgot_text' href="#1" onClick={handleResetPassword}>¿Olvidaste tu contraseña?</a>

                <div className="buttons">
                    
                    <Button variant="light" type="submit" style={{ width: "51%", float:"right"}} onClick={handleGoogleSignin}>
                        <FcGoogle /> Ingresa con Google
                    </Button>

                    <Button variant="light" type="submit" style={{ width: "51%", float:"right", marginTop: "2%"}} onClick={handleFacebookSignin}>
                        <BsFacebook /> Ingresa con Facebook
                    </Button>

                    <Button 
                    style={{ width: "51%", float:"right", marginTop: "2%"}}
                    variant="secondary" 
                    onClick={handleRegister}>
                        ¿No tienes cuenta? Regístrate
                    </Button>
                </div>
            </Stack>
        </Container>
    )
}
