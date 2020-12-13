import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import RestaurantDetail from "./pages/RestaurantDetail";
import RestaurantMain from './pages/RestaurantMain';
import DriverMain from './pages/DriverMain';
import RestaurantOrder from "./pages/RestaurantOrder";
import DriverOrderHistory from './pages/DriverOrderHistory';
import DriverCurrentOrder from './pages/DriverCurrentOrder';
import Cart from './pages/Cart';
import CustomerOrderHistory from './pages/CustomerOrderHistory';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" component={Home} />
      <Route exact path="/restaurant/:id" component={RestaurantDetail} />
      <Route exact path="/restaurant/order/:id" component={RestaurantOrder} />
      <Route exact path="/restaurantLoggedin/:id" component={RestaurantMain} />
      <Route exact path="/driverLoggedin/orderHistory" component={DriverOrderHistory} />
      <Route exact path="/driverLoggedin/currentOrder" component={DriverCurrentOrder} />
      <Route exact path="/driverLoggedin/:id" component={DriverMain} />
      <Route exact path='/cart' component={Cart} />
      <Route exact path='/customer/orderHistory' component={CustomerOrderHistory} />
      <Route component={NotFound} />
    </Switch>
  );
}
