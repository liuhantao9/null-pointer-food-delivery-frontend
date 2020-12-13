import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../GlobalContext';
import { Button, Table, Form } from "react-bootstrap"

export default function RestaurantOrder() {

  const { userInfo: { id, email }, setUserInfo } = useContext(GlobalContext); 

  const [submittedOrders, setSubmittedOrders] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [orderOptions, setOrderOptions] = useState('submitted');
  const [selectedSubmitted, setSelectedSubmitted] = useState([]);
  const [selectedPreparing, setSelectedPreparing] = useState([]);

  useEffect(() => {
    fetch(`/restaurant/${id}/order/${orderOptions}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Contents-Type": "application/json"
      }
    })
    .then((res) => res.json())
    .then((data) => {
        if (orderOptions === 'submitted') {
          setSubmittedOrders(data);
        } else {
          setPreparingOrders(data);
        }
    })
  }, [orderOptions])

  const orderArray = () => {
    let orders = orderOptions === 'submitted' ? submittedOrders : preparingOrders;
    let orderArray = orders.map((order, idx) => {
      return (
        <tr key={idx}>
          <td>
            <Form.Control type="checkbox" 
              value={order} id={order.id} 
              checked={
                orderOptions === 'submitted' ? 
                selectedSubmitted.includes(order.id) : selectedPreparing.includes(order.id)
              } 
              onChange={(e) => {
                if (orderOptions === 'submitted') {
                  let newSelectedSubmitted = [...selectedSubmitted, e.target.id]
                  if (selectedSubmitted.includes(e.target.id)) {
                    newSelectedSubmitted = newSelectedSubmitted.filter(id => id !== e.target.id);
                  }
                  setSelectedSubmitted(newSelectedSubmitted);
                } else {
                  let newSelectedPreparing = [...selectedPreparing, e.target.id]
                  if (selectedPreparing.includes(e.target.id)) {
                    newSelectedPreparing = newSelectedPreparing.filter(id => id !== e.target.id);
                  }
                  setSelectedPreparing(newSelectedPreparing);
              }
            }} />
          </td>
          <td>{order.id}</td>
          <td>{JSON.stringify(order.orderItems)}</td>
        </tr>
      )
    })
    return orderArray;
  }

  const header = () => {
    if (orderOptions === 'submitted') {
      return (
        <h1>Orders waiting to be accepted</h1>
      )
    } else {
      return (
        <h1>Orders waiting to be finished</h1>
      )
    }
  }

  const onChangeToSubmitted = (e) => {
    e.preventDefault();
    setOrderOptions('submitted');
  }

  const onChangeToPreparing = (e) => {
    e.preventDefault();
    setOrderOptions('preparing');
  }

  const onAcceptingOrder = () => {
    selectedSubmitted.forEach( async (id) => {
      const res = await fetch(`/preparingOrder/${id}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Contents-Type": "application/json"
        }
      })
      if (res.status !== 200) {
        alert(res.statusText)
        return null;
      }
    });
    let newSubmittedOrders = submittedOrders.filter(order => !selectedSubmitted.includes(order.id));
    setSubmittedOrders(newSubmittedOrders);
    setSelectedSubmitted([]);
  }

  const onFinishingOrder =  () => {
    selectedPreparing.forEach( async (id) => {
      const res = await fetch(`/waitingOrder/${id}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Contents-Type": "application/json"
        }
      })

      if (res.status !== 200) {
        alert(res.statusText);
        return null;
      }
    });
    let newPreparingOrders = preparingOrders.filter(order => !selectedPreparing.includes(order.id));
    setPreparingOrders(newPreparingOrders);
    setSelectedPreparing([]);
  }

  return (
    <div>
      {header()}
      <Button onClick={onChangeToSubmitted} style={{ margin: "5px" }}>Select Submitted Orders</Button>
      <Button onClick={onChangeToPreparing} style={{ margin: "5px" }}>Select Preparing Orders</Button>
      <Table striped hover>
        <thead>
          <tr>
            <th>Checkbox</th>
            <th>OrderID</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {orderArray()}
        </tbody>
      </Table>
      <Button onClick={orderOptions === 'submitted' ? onAcceptingOrder : onFinishingOrder}>
        {orderOptions === 'submitted' ? "Accept the Order" : "Finish the Order"}
      </Button>
    </div>
  )
}
