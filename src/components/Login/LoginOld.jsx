import React, { useState } from 'react';
//import './login.css';
import { Form, Button, InputGroup, Stack, Container }  from 'react-bootstrap';
//import firebaseApp from './firebase-config';  
//import logo from './../logo.svg';  
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import  {  getAuth,  createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider, FacebookAuthProvider} 
  from "firebase/auth";

// const auth = getAuth(firebaseApp);
// const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();

export function LoginOld() {
  // const  [estaRegistrandose, setEstaRegistrandose] = useState(false);

  // async function submitHandler(e){
  //   e.preventDefault();
  //   const correo = e.target.formBasicEmail.value;
  //   const contra = e.target.formBasicPassword.value;
  //   const usuario = await createUserWithEmailAndPassword(auth, correo, contra );

  //   if (estaRegistrandose){
  //     //Si se registra
  //     const usuario = await createUserWithEmailAndPassword(auth, correo, contra);
  //     } else {
  //       //Si esta iniciando sesion
  //       signInWithEmailAndPassword(auth, correo, contra);
  //     }
  //   }
  
  return (
    <div>Login Anterior </div>
  //  <Container className="login_container">
  //   <Stack gap={3}>
  //   <img src={logo} className="img-responsive center-block d-block mx-auto" alt="imagen_logo"></img>
  //   <h2 className = "main_text">{estaRegistrandose ? "Create account" : "Sign up"}</h2>
  //   <p className = "second_text">Login or create an account</p>
  //     <Form onSubmit={submitHandler}>
  //       <Form.Group className="mb-3" controlId="formBasicEmail">
  //         <Form.Label>E-mail address</Form.Label>
  //         <Form.Control type="email" placeholder="Enter e-mail" />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="formBasicPassword">
  //         <Form.Label>Password</Form.Label>
  //         <Form.Control type="password" placeholder="Enter password" />
  //       </Form.Group>
  //       <Button variant="warning" type="submit" style={{ width: "51%", float: "right"}}>
  //         {estaRegistrandose ? "Sign in" : "Sign up"}
  //       </Button>
  //     </Form>
  //     <div className="buttons">
  //       <Button variant="light" type="submit" style={{ width: "51%", float:"right"}} 
  //         onClick={() => signInWithRedirect(auth, googleProvider)}><FcGoogle /> {estaRegistrandose ? "Register with Google" : "Login with Google"}
  //       </Button>

  //       <Button variant="light" type="submit" style={{ width: "51%", float:"right", marginTop: "2%"}} 
  //         onClick={() => signInWithRedirect(auth, facebookProvider)}><BsFacebook /> {estaRegistrandose ? "Register with Facebook" : "Login with Facebook"}
  //       </Button>

  //       <Button 
  //         style={{ width: "51%", float:"right", marginTop: "2%"}}
  //         variant="secondary" 
  //         onClick={() => setEstaRegistrandose(!estaRegistrandose)}>
  //           {estaRegistrandose ? "Do you already have an account? Sign up" : "Don't have an account? Register!"}
  //       </Button>
  //     </div>
  //   </Stack>
  // </Container>
  )
}