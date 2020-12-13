import { Button, Nav } from "react-bootstrap";
import { useContext } from "react";
import { GlobalContext } from "../../../GlobalContext";
import { useHistory } from 'react-router-dom';
export default function CustomerNavbarItems() {
  let history = useHistory();
  const {
    userInfo: { email },
    setUserInfo,
  } = useContext(GlobalContext);
  const onCartClick = () => {
    alert("cart clicked");
  };

  const onLogout = () => {
    setUserInfo(null);
    history.push('/home');
  };

  const onOrderHistory = () => {
    history.push('/customer/orderHistory');
  };

  return (
    <>
      <Nav className="ml-auto">
        <Nav.Item>{`Hi, ${email}`}</Nav.Item>
        <Button variant="outline-primary" size="md" onClick={onLogout}>
          Logout
        </Button>
        {/* <Button variant="outline-primary" size="md" onClick={onCartClick}>
          Cart
        </Button> */}
        <Button variant="outline-primary" size="md" onClick={onOrderHistory}>
          Order History
        </Button>
      </Nav>
    </>
  );
}
