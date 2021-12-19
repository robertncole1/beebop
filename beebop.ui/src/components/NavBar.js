import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from 'reactstrap';
import { signInUser, signOutUser } from '../helpers/auth';

const NavBar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="nav" light expand="md">
        <NavbarBrand href="/">
          <img
          src="https://user-images.githubusercontent.com/76854545/146072491-2e475bf8-8196-481d-8a3e-45995d0edb01.png"
          width="170"
          className="d-inline-block align-top"
          alt="beebop logo"
        />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/about">About Us</Link>
            </NavItem>
            {
              user
                ? <NavItem>
                  <Link className="nav-link" to={`/get-started/${user?.id}`}>Get Started</Link>
                  </NavItem>
                : ''
            }
            {
              user.isParent === true
              && <>
                <NavItem>
                  <Link className="nav-link" to="/add-baby">Add Your Baby</Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/baby">Your Baby</Link>
                </NavItem>
              </>
            }
            {
              user.isParent === false
              && <>
                <NavItem>
                  <Link className="nav-link" to="/caregiver-baby">Your Client&apos;s Baby</Link>
                </NavItem>
              </>
            }
          </Nav><div className='auth-btn-container'>
                {
                  // eslint-disable-next-line no-nested-ternary
                  user
                    ? <NavItem className='nav-cart-signout'>
                        <Button className="signOut" onClick={signOutUser}>Sign Out</Button>
                      </NavItem>
                    : <Button className="signIn" onClick={() => signInUser(setUser)}>Sign In</Button>
                }
              </div>
        </Collapse>
      </Navbar>
    </div>
  );
};
NavBar.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
};
export default NavBar;
