import React from 'react';
import './verification.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import logo from '../../logo.svg';

function Verification() {
  return (
    <>
    <section >
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

    <div className='login_container'>
      <Form>
        <div className="content_sup">
          {/* Encabezado */}
          <img src={logo} className="img-responsive center-block d-block mx-auto" alt="imagen_logo"></img>
          <h2 className = "mainText" > Sign in </h2>
          <p className = "secondText">Login or create an account with your phone number to start ordering</p>
        
          {/* Campo para ingresar dato */}
          <InputGroup className="mb-3">
            <Button variant="outline-secondary" id="button-addon1"><i class="fa fa-phone"> </i> +1 </Button>
            <Form.Control
              required type="number"
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
        <div className="content_inf">
          {/* Textos */}
          <p className = "tirt-text">By clicking the button next you accept</p>
          <Button variant="link">Terms of use</Button> 

          {/* Boton final */}
          <div className="row justify-content-center">
            <Button variant="warning">Iniciar sesión</Button>{' '}
          </div>
        </div>
        </Form> 
      </div>
    </section>
    </>
  )
}

export default Verification