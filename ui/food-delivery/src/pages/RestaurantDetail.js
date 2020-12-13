import React, { useState, useEffect } from 'react'
import DishCard from '../shared/components/DishCard';
import { Row, Col, Container, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom";

export default function RestaurantDetail(props) {

  const[dishes, setDishes] = useState([])

  useEffect(() => {
    fetch(`/restaurant/${props.match.params.id}/menu`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => res.json())
    .then((data) => {
      let newDishes = Array.isArray(data) && data.map(e => {
        e.number = 0;
        return e;
      })
      setDishes(newDishes)
    })
  }, []);

  const groupIntoCol = (dishes) => {
    return <Row key={btoa(Math.random()).substr(10, 5)}>{dishes}</Row>;
  }

  const groupDishes = (num, dishes) => {
    let tmp = [];
    let res = [];

    const handleNumberChange = (name, number) => {
      setDishes(Array.isArray(dishes) && dishes.map(dish => dish.name === name ? {...dish, number} : dish));
    }

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
  }

  const dishGrids = groupDishes(4, dishes)

  let history = useHistory();
  const onOrderPlaced = () => {
    const cart = dishes.filter((dish) => {
      return dish.number > 0;
    });
    history.push('/cart', { cart, restaurantId: props.match.params.id });
  };
    
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1>
              <br />
                Restaurant Menu
              <br />
            </h1>
          </Col>
        </Row>
        <Row>{dishGrids}</Row>
      </Container>
      <Button variant="primary" style={{ marginTop: "3rem" }} onClick={onOrderPlaced}>Place Order Now</Button>
    </div>
  )
}
