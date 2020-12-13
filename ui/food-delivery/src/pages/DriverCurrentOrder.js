import { Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import getRestaurantMap from '../api/getRestaurantMap';

export default function DriverCurrentOrder() {
  const [deliveringOrders, setDeliveringOrders] = useState(null);
  const { userInfo } = useContext(GlobalContext);

  const getDeliveringOrders = async () => {
    const data = {
      driverId: userInfo.id,
    };
    const res = await fetch('/orders/delivering', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.status !== 200) {
      alert(res.statusText);
      return null;
    }
    const json = await res.json();
    const restaurantMap = await getRestaurantMap();
    json.forEach((e) => {
      const restaurantId = e.restaurantId;
      const restaurantDetail = restaurantMap[restaurantId];
      e.restaurantStreet = restaurantDetail.street;
      e.restaurantCity = restaurantDetail.city;
      e.restaurantZip = restaurantDetail.zipcode;
      e.restaurantName = restaurantDetail.name;
    })
    setDeliveringOrders(json);
  };

  useEffect(() => {
    getDeliveringOrders();
  }, [])

  const setOrderDelivered = async (id) => {

    if (userInfo === null) {
      alert('Not signed in!');
      return;
    }
    if (userInfo.type !== 'DRIVER') {
      alert('Not signed in as a driver!');
      return;
    }

    const data = {
      orderId: id,
      driverId: userInfo.id,
    };

    const res = await fetch('/finishOrder', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.status !== 200) {
      alert(res.statusText);
      return;
    }
    alert('Order finished!');
    getDeliveringOrders();
  };

  const onDeliveredClick = (e) => {
    setOrderDelivered(e.target.id);
  };

  const listToTable = (orders) => {
    if (orders === null) return null;
    const rows = orders.map((order, i) => {
      const { id, firstName, lastName, phoneNumber, zip, created, address, totalPrice, restaurantStreet, restaurantCity, restaurantZip, restaurantName  } = order;
      return (
        <tr id={i} >
          <td>{i}</td>
          <td>{new Date(created).toLocaleString()}</td>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{phoneNumber}</td>
          <td>{zip}</td>
          <td>{address}</td>
          <td>{totalPrice}</td>
          <td>{restaurantStreet}</td>
          <td>{restaurantCity}</td>
          <td>{restaurantZip}</td>
          <td>{restaurantName}</td>
          <td><Button id={id} onClick={onDeliveredClick}>Delivered!</Button></td>
        </tr>
      );
    });
    return rows;
  };

  return (
    <div>
      <br />
      <h1>Your Active Orders</h1>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Created</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Zip</th>
            <th>Address</th>
            <th>Total Price</th>
            <th>Restaurant Street</th>
            <th>Restaurant City</th>
            <th>Restaurant Zip</th>
            <th>Restaurant Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listToTable(deliveringOrders)}
        </tbody>
      </Table>
    </div>
  );
}