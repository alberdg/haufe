import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux'
import { signup, setName, setEmail, setPassword, setSignupError } from '../../actions/signup';
import Spinner from '../spinner';

const Signup = ({ history }) => {
  const [ loading, setLoading ] = useState(false);
  const [ emailInUseError, setEmailInUseError] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { name, email, password, signupError } = useSelector(state => state.signup);

  useEffect(() => {
    dispatch(setSignupError(false));
  }, []);

  if (user) {
    return <Redirect to='/home' />
  }

  const isEmailInUse = error => {
    if (!error || !error.response || !error.response.data) {
      return false;
    }
    const { errors } = error.response.data;
    if (!Array.isArray(errors) || errors.length !== 1) {
      return false;
    }
    return errors[0].message === 'EMAIL_IN_USE';
  }

  const doSignup = () => {
    setLoading(true);
    setSignupError(false);
    setEmailInUseError(false);
    dispatch(signup(name, email, password, (data) => {
      setLoading(false);
    }, (error) => {
      const emailInUse = isEmailInUse(error);
      setEmailInUseError(emailInUse);
      setLoading(false);
      setSignupError(true);
    }));

  }

  const renderError = (display, message) => {
    if (!display) return null;
    return (
      <div className="alert alert-error">
        {message}
      </div>
    )
  }
  const renderSignupError = () => {
    const display = !loading && !emailInUseError && signupError;
    return renderError(display, 'Error in sign up, please try again');
  }

  const renderEmailInUseError = () => {
    const display = !loading && emailInUseError;
    return renderError(display, 'The given email is in use');
  }

  const renderNameInput = () => {
    return (
      <div className="row">
        <input type="name" id="name-input" className="form-control" onChange={event => dispatch(setName(event.target.value))} value={name}
          placeholder="Your first name"/>
      </div>
    );
  }

  const renderEmailInput = () => {
    return (
      <div className="row">
        <input type="email" id="email-input" className="form-control" onChange={event => dispatch(setEmail(event.target.value))} value={email}
          placeholder="Your best email"/>
      </div>
    );
  }

  const renderPasswordInput = () => {
    return (
      <div className="row">
        <input type="password" id="password-input"  className="form-control"onChange={event => dispatch(setPassword(event.target.value))} value={password}
          placeholder="Your strongest password"/>
      </div>
    );
  }

  const renderSignup = () => {
    return (
      <div className="row">
        <button id="signup-submit" onClick={() => doSignup()} className="btn btn-primary">Sign up</button>
      </div>
    );
  }

  const renderSignin = () => {
    return (
      <div className="row">
        <Link id="log-in" to="/">Sign in</Link>
      </div>
    );
  }

  const renderTitle = () => {
    return (
      <div id="signup-title" className="row">
        <h3>Sign up to Haufe Test</h3>
      </div>
    )
  }

  const renderSubtitle = () => {
    return (
      <div id="signup-subtitle" className="row">
        <h5>Please provide your details</h5>
      </div>
    )
  }

  const renderForm = () => {
    if (loading) return null;
    return (
        <form noValidate className="form-details">
          {renderTitle()}
          {renderSubtitle()}
          {renderNameInput()}
          {renderEmailInput()}
          {renderPasswordInput()}
          {renderSignup()}
          {renderSignin()}
          {renderSignupError()}
          {renderEmailInUseError()}
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



export default connect(null, { setName, setEmail, setPassword, setSignupError })(Signup);
