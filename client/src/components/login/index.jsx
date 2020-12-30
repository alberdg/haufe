import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux'
import { login, setEmail, setPassword, setLoginError } from '../../actions/auth';
import Spinner from '../spinner';
import '../../forms.css';
const Login = ({ history }) => {
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();
  const { email, password, loginError, user } = useSelector(state => state.auth);

  if (user) {
    return <Redirect to='/home' />
  }

  const doLogin = () => {
    setLoading(true);
    setLoginError(false);
    dispatch(login(email, password, (data) => {
      setLoading(false);
    }, (error) => {
      setLoading(false);
      setLoginError(true);
    }));

  }

  const renderLoginError = () => {
    if (loading || !loginError) return null;
    return (
      <div className="alert alert-error">
        Invalid credentials
      </div>
    )
  }


  const renderEmailInput = () => {
    return (
      <div className="row">
        <input type="email" id="email-input" className="form-control" onChange={event => dispatch(setEmail(event.target.value))} value={email} />
      </div>
    );
  }

  const renderPasswordInput = () => {
    return (
      <div className="row">
        <input type="password" id="password-input"  className="form-control"onChange={event => dispatch(setPassword(event.target.value))} value={password} />
      </div>
    );
  }

  const renderSignin = () => {
    return (
      <div className="row">
        <button id="login-submit" onClick={() => doLogin()} className="btn btn-primary">Log in</button>
      </div>
    );
  }

  const renderSignup = () => {
    return (
      <div className="row">
        <Link id="create-account" to="/signup">Create an account</Link>
      </div>
    );
  }

  const renderTitle = () => {
    return (
      <div className="row">
        <h3 id="login-title">Welcome to Haufe Test</h3>
      </div>
    )
  }

  const renderSubtitle = () => {
    return (
      <div className="row">
        <h5 id="login-subtitle">Please provide your login details</h5>
      </div>
    )
  }

  const renderForm = () => {
    if (loading) return null;
    return (
        <form noValidate className="form-details">
          {renderTitle()}
          {renderSubtitle()}
          {renderEmailInput()}
          {renderPasswordInput()}
          {renderSignin()}
          {renderSignup()}
          {renderLoginError()}
      </form>
    );
  }

  const renderSpinner = () => {
    if (!loading) return null;
    return <Spinner />
  }

  return (
    <div className="form-container">
      {renderSpinner()}
      {renderForm()}
    </div>
  );
}



export default connect(null, { setEmail, setPassword, setLoginError })(Login);
