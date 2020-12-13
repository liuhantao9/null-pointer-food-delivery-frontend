import { Button, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { GlobalContext } from '../../../GlobalContext';
import { useHistory } from 'react-router';
export default function RestaurantNavbarItems() {

  const { userInfo: { id, email }, setUserInfo } = useContext(GlobalContext);

  let history = useHistory();

  const onCurrentOrder = () => {
    history.push(`/restaurant/order/${id}`)
  }

  const onLogout = () => {
    setUserInfo(null);
  }

  const onEditMenu = () => {
    history.push(`/restaurantLoggedin/${id}`)
  }

  return (
    <>
      <Nav className="ml-auto">
        <Nav.Item>
          {`Hi, ${email}`}
        </Nav.Item>
        <Button variant="outline-primary" size="md"
          onClick={onLogout}
        >
          Logout
        </Button>
        <Button variant="outline-primary" size="md"
          onClick={onEditMenu}
        >
          Check Menu
        </Button>
        <Button variant="outline-primary" size="md"
          onClick={onCurrentOrder}
        >
          Current Order
        </Button>
      </Nav>
      
    </>
  );
}