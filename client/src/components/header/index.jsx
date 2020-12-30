import React from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import './header.css';

const Header = () => {
  const dispatch = useDispatch();
  const performLogout = () => {
    dispatch(logout());
  }

  return (
    <header id="haufe-header">
      <Link className="nav-item" to='/home'>Home</Link>
      <Link className="nav-item" to='/' onClick={() => performLogout()}>Logout</Link>
    </header>
  )
}
export default connect(null, {})(Header);
