import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from 'react-bootstrap/Jumbotron';
import RestaurantBrief from "../shared/components/RestaurantBrief";
import { GlobalContext } from '../GlobalContext';
export default class Home extends React.Component {
  static contextType = GlobalContext;
  constructor() {
    super();
    this.state = {
      restaurants: [],
    };

  }

  async componentDidMount() {
    const res = await fetch("/restaurants", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { userInfo } = this.context;
    const json = await res.json();
    this.setState({ restaurants: json });
  }

  groupIntoCol(briefs) {
    return <Row key={btoa(Math.random()).substr(10, 5)}>{briefs}</Row>;
  }

  groupRestaurants(num, briefs) {
    let tmp = [];
    let res = [];
    for (let i = 0; i < briefs.length; i++) {
      tmp.push(
        <Col key={btoa(Math.random()).substr(10, 5)}>
          <RestaurantBrief briefs={briefs[i]} />
        </Col>
      );
      if (i % num === num - 1) {
        res.push(this.groupIntoCol(tmp));
        tmp = [];
      }
    }
    if (tmp.length > 0) {
      res.push(this.groupIntoCol(tmp));
    }
    return res;
  }

  render() {
    const { restaurants } = this.state;
    const restaurantGrids = this.groupRestaurants(4, restaurants);

    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Jumbotron>
                <h1>Your Best Food Delivery Website</h1>
                <p>
                  Null Pointer is the easy way to get the food you love delivered.
                </p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>{restaurantGrids}</Row>
        </Container>
      </div>
    );
  }
}
