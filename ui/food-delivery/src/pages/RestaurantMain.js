import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { Table } from "react-bootstrap"

export default function RestaurantMain() {

  const { userInfo: { id }, setUserInfo } = useContext(GlobalContext);

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch(`/restaurant/${id}/menu`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Contents-Type": "application/json"
      }
    })
    .then((res) => res.json())
    .then((data) => { setMenu(data) })
  }, [])

  const getTableItems = menu.map((item, idx) => {
    return (
      <tr key={idx}>
        <td>{idx}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
      </tr>
    )
  })

  return (
    <div>
      <h2>
        This is the Restaurant Mainpage.
      </h2>
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {getTableItems}
        </tbody>
      </Table>
    </div>
  );
}