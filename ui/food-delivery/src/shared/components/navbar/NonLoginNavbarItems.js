import React from 'react';
import { NavDropdown, Button } from 'react-bootstrap';
import Login from '../modals/Login';
import Signup from '../modals/Signup';

export default class NonLoginNavbarItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loginModalShow: false,
      loginUserType: null,
      signupModalShow: false,
    };
    this.setLoginModalShow = this.setLoginModalShow.bind(this);
    this.setSignupModalShow = this.setSignupModalShow.bind(this);
    this.customerLogin = this.customerLogin.bind(this);
    this.restaurantLogin = this.restaurantLogin.bind(this);
    this.driverLogin = this.driverLogin.bind(this);
    this.customerSignup = this.customerSignup.bind(this);
    this.restaurantSignup = this.restaurantSignup.bind(this);
    this.driverSignup = this.driverSignup.bind(this);
  }

  setLoginModalShow(flag) {
    this.setState({ loginModalShow: flag });
  }

  setSignupModalShow(flag) {
    this.setState({ signupModalShow: flag });
  }

  customerLogin() {
    this.login('CUSTOMER');
  }

  restaurantLogin() {
    this.login('RESTAURANT');
    
  }

  driverLogin() {
    this.login('DRIVER');
  }

  customerSignup() {
    this.signup('CUSTOMER');
  }

  restaurantSignup() {
    this.signup('RESTAURANT');
  }

  driverSignup() {
    this.signup('DRIVER');
  }

  login(type) {
    this.setState({ loginModalShow: true, loginUserType: type });
  }

  signup(type) {
    this.setState({ signupModalShow: true, loginUserType: type });
  }

  render() {
    const { loginModalShow, signupModalShow, loginUserType } = this.state;

    return (
      <>
      <NavDropdown title="Login or Signup" id="basic-nav-dropdown" alignRight>
        <NavDropdown.Item >
        <Button variant="success" size="md" block
          onClick={this.customerSignup}
        >
          Customer Signup
        </Button>
        </NavDropdown.Item>
        <NavDropdown.Item >
        <Button variant="primary" size="md" block
          onClick={this.customerLogin}
        >
          Customer Login
        </Button>
        <NavDropdown.Divider />
        </NavDropdown.Item>
        <NavDropdown.Item >
        <Button variant="success" size="md" block
          onClick={this.restaurantSignup}
        >
          Restaurant Signup
        </Button>
        </NavDropdown.Item>
        <NavDropdown.Item >
        <Button variant="primary" size="md" block
          onClick={this.restaurantLogin}
        >
          Restaurant Login
        </Button>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item >
        <Button variant="success" size="md" block
          onClick={this.driverSignup}
        >
          Driver Signup
        </Button>
        </NavDropdown.Item>
        <NavDropdown.Item >
        <Button variant="primary" size="md" block
          onClick={this.driverLogin}
        >
          Driver Login
        </Button>
        </NavDropdown.Item>
      </NavDropdown>
      <Login
        userType={loginUserType}
        show={loginModalShow}
        onHide={() => this.setLoginModalShow(false)}
      />
      <Signup
        userType={loginUserType}
        show={signupModalShow}
        onHide={() => this.setSignupModalShow(false)}
      />
      </>
    );
  }
}