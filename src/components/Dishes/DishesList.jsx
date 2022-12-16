import React, { useState } from 'react';
import { Container, Stack, Row, Col, Form, Modal, Button } from "react-bootstrap";
import "./disheslist.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDishesUser } from "../../features/dishes/dishUserSlice";

export const DishesList = ({ arrayDish: dishArray }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    navigate("/confirmationorder");
}


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (dish) => () => {
    dispatch(addDishesUser(dish));
    navigate("/dishdetail");
  };

  return (
    <Container fluid className="disheslist_container">
      <Stack>
        {dishArray.map((dishObject, index) => {
          return (
            <>
              <Row key={index}>
                {/* <Col >
                                        <img src={dishObject.imagen} alt="dish" style={{borderRadius:"8%"}} />
                                    </Col> */}
                <Col>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={dishObject.name}
                    onChange={handleShow}
                  />
                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Has seleccionado tu turno</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Da click en "Aceptar" para confirmar tu elección
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                      </Button>
                      <Button variant="primary" onClick={handleConfirm}>Aceptar</Button>
                    </Modal.Footer>
                  </Modal>
                  {/* <p className='desc_text'>{dishObject.name}</p>
                                        <p>${dishObject.price}</p> */}
                </Col>
              </Row>
              <hr />
            </>
          );
        })}
      </Stack>
    </Container>
  );
};
export default DishesList;
