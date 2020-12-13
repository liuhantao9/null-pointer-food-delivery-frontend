import React, { useState, useEffect } from 'react'
import DishCard from '../shared/components/DishCard';
import { Row, Col, Container, Button, Form, InputGroup, FormControl } from "react-bootstrap"
import { useHistory, useLocation } from "react-router-dom";
import { GlobalContext } from '../GlobalContext';
import { useContext } from 'react';
import PaymentInputs from '../shared/components/Payment';


const getTotalPrice = (dishes) => {
  let price = 0;
  dishes.forEach(dish => {
    price = price + dish.number * dish.price;
  });
  return price;
};


export default function Cart(props) {

  let history = useHistory();
  const location = useLocation();
  const { cart, restaurantId } = location.state;
  const [dishes, setDishes] = useState(cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const { userInfo } = useContext(GlobalContext);

  useEffect(() => {
    setTotalPrice(getTotalPrice(dishes));
  }, []);

  if (userInfo === null) {
    return (
      <div>
        Please login.
      </div>
    );
  }

  if (userInfo.type !== 'CUSTOMER') {
    return (
      <div>
        Please login as a customer.
      </div>
    );
  }

  const groupIntoCol = (dishes) => {
    return <Row key={btoa(Math.random()).substr(10, 5)}>{dishes}</Row>;
  }

  const handleNumberChange = (name, number) => {
    const newDishes = dishes.map(dish => dish.name === name ? {...dish, number} : dish);
    setDishes(newDishes);
    setTotalPrice(getTotalPrice(newDishes));
  }

  const groupDishes = (num, dishes) => {
    let tmp = [];
    let res = [];
    for (let i = 0; i < dishes.length; i++) {
      tmp.push(
        <Col key={btoa(Math.random()).substr(10, 5)}>
          <DishCard dishDetail={dishes[i]} handleNumberChange={handleNumberChange}/>
        </Col>
      );
      if (i % num === num - 1) {
        res.push(groupIntoCol(tmp));
        tmp = [];
      }
    }
    if (tmp.length > 0) {
      res.push(groupIntoCol(tmp));
    }
    return res;
  };

  const dishGrids = groupDishes(4, dishes);

  const submitOrder = async (e) => {
    e.preventDefault();
    const { 
      formGridFirstName, 
      formGridLastName,  
      formGridAddress1,
      formGridZip,
      formGridPhone,

    } = e.target.elements;
    const orderItems = dishes.map((dish) => {
      return {
        name: dish.name,
        price: dish.price,
        quantity: dish.number,
      };
    });

    const currentDate = (new Date()).toISOString();
    const order = {
      userId: userInfo.id,
      driverId: null,
      restaurantId,
      orderStatus: 'SUBMITTED',
      orderItems: orderItems,
      tax: totalPrice * 0.1,
      deliveryFee: 10,
      totalPrice: totalPrice * 1.1 + 10,
      firstName: formGridFirstName.value,
      lastName: formGridLastName.value,
      phoneNumber: formGridPhone.value,
      zip: parseInt(formGridZip.value),
      address: formGridAddress1.value,
      created: currentDate,
      lastModified: currentDate,
    }

    const res = await fetch('/order', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    if (res.status !== 200) {
      alert(res.statusText);
      return null;
    }
    alert('order submitted!');
    history.push('/customer/orderHistory');
  };

  return (
    <div>
      <Container>
        <Row><Col><h1><br />Cart Items<br /></h1></Col></Row>
        <Row>{dishGrids}</Row>
        <Row><Col><h1><br />Total Price<br /></h1></Col></Row>
        <Row>
        <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Tax</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={0.1 * totalPrice} />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Delivery fee</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={10} />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Sum</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={(1.1 * totalPrice + 10).toFixed(2)} />
            </InputGroup>
          </Col>
        </Row>
        <Row><Col><br /><h2>Payment Method</h2><br /></Col></Row>
        <Row><Col><PaymentInputs /></Col></Row>
        <Row><Col><br /><h2>Your Address</h2><br /></Col></Row>
        <Row>
          <Col>
            <Form onSubmit={submitOrder}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control placeholder="Enter first name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control placeholder="Enter last name" />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
              </Form.Group>

              <Form.Row>
                {/* <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control as="select" defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Control>
                </Form.Group> */}

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit" >
                Submit Order
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}