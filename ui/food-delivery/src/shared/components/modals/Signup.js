import React, { useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { GlobalContext } from '../../../GlobalContext';
import { useHistory } from "react-router-dom";

export default function Signup(props) {

  const { userType, show, onHide } = props;
  const { userInfo, setUserInfo } = useContext(GlobalContext);
  let history = useHistory();

  const onClickSubmit = async (e) => {
    e.preventDefault();
    const { formEmail, formPassword, formConfirmPassword } = e.target.elements;
    let data = {
      email: formEmail.value,
      password: formPassword.value,
      confirmPassword: formConfirmPassword.value,
    };

    if (formPassword.value !== formConfirmPassword.value) {
      alert('Password does not match!');
      return;
    }

    let restful = null;

    switch (userType) {
      case 'CUSTOMER':
        restful = '/customer/signup';
        break;
      case 'RESTAURANT':
        restful = '/restaurant/signup';
        break;
      case 'DRIVER':
        restful = '/driver/signup';
        break;
      default:
        return;
    }
    let res = await fetch(restful, {
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

    let json = await res.json();
    setUserInfo({
      id: json.id,
      type: userType,
      email: json.email,
    });

    let jumpTo = null;

    data = {
      email: formEmail.value,
      password: formPassword.value,
    };

    restful = null;

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
    res = await fetch(restful, {
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

    json = await res.json();

    jumpTo = null;

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
  }


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
          {`Please Signup (${userType})`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onClickSubmit} >
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit" >
            Signup
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
