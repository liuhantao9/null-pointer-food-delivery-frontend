import { Button, Nav } from "react-bootstrap";
import { useContext } from "react";
import { GlobalContext } from "../../../GlobalContext";
import { useHistory } from 'react-router-dom';
export default function DriverNavbarItems() {
  const {
    userInfo: { email, id },
    setUserInfo,
  } = useContext(GlobalContext);

  let history = useHistory();

  const onLogout = () => {
    setUserInfo(null);
    history.push('/home');
  };

  const onOrderHistory = () => {
    history.push('/driverLoggedin/orderHistory');
  };

  const onAvailableOrder = () => {
    history.push(`/driverLoggedin/${id}`);
  };

  const onCurrentOrder = () => {
    history.push('/driverLoggedin/currentOrder');
  };

  return (
    <>
      <Nav className="ml-auto">
        <Nav.Item>{`Hi, ${email}`}</Nav.Item>
        <Button variant="outline-primary" size="md" onClick={onLogout}>
          Logout
        </Button>
        <Button variant="outline-primary" size="md" onClick={onAvailableOrder}>
          Available Orders
        </Button>
        <Button variant="outline-primary" size="md" onClick={onCurrentOrder}>
          My Current Orders
        </Button>
        <Button variant="outline-primary" size="md" onClick={onOrderHistory}>
          Order History
        </Button>
      </Nav>
    </>
  );
}
