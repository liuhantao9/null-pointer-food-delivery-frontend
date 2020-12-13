import React, { useContext } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { GlobalContext } from "../../../GlobalContext";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const { userType, show, onHide } = props;
  const { userInfo, setUserInfo } = useContext(GlobalContext);
  let history = useHistory();

  const onClickSubmit = async (e) => {
    e.preventDefault();
    const { formEmail, formPassword } = e.target.elements;
    const data = {
      email: formEmail.value,
      password: formPassword.value,
    };

    let restful = null;

    switch (userType) {
      case "CUSTOMER":
        restful = "/customer/login";
        break;
      case "RESTAURANT":
        restful = "/restaurant/login";
        break;
      case "DRIVER":
        restful = "/driver/login";
        break;
      default:
        return;
    }
    const res = await fetch(restful, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status !== 200) {
      alert(res.statusText);
      return;
    }

    const json = await res.json();
    setUserInfo({
      id: json.id,
      type: userType,
      email: json.email,
    });

    let jumpTo = null;

    switch (userType) {
      case "RESTAURANT":
        jumpTo = `/restaurantLoggedin/${json.id}`;
        break;
      case "DRIVER":
        jumpTo = `/driverLoggedin/${json.id}`;
        break;
      default:
    }
    if (jumpTo !== null) {
      history.push(jumpTo);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Please Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onClickSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          {/* <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
