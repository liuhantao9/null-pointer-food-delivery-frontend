import { Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import getRestaurantMap from '../api/getRestaurantMap';

export default function DriverOrderHistory() {
  const [orders, setOrders] = useState(null);
  const { userInfo } = useContext(GlobalContext);

  const getOrderHistory = async () => {
    const startDate = new Date('1900-01-01T01:00:00');
    const endDate = new Date();
    const data = {
      driverId: userInfo.id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    const res = await fetch('/driver/ordersbydate', {
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
    setOrders(json);
  };

  useEffect(() => {
    getOrderHistory();
  }, [])


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
        </tr>
      );
    });
    return rows;
  };

  return (
    <div>
      <br />
      <h1>Your Order History</h1>
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
          </tr>
        </thead>
        <tbody>
          {listToTable(orders)}
        </tbody>
      </Table>
    </div>
  );
}
