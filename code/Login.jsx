import { useRef, useState, useEffect, useContext } from 'react';
import {AuthContext} from '../client/src/context/AuthProvider';
import axios from '../client/src/api/axios';
import Dashboard from '../client/src/components/Dashboard/Dashboard';
import './login.scss';
import logo from '../Dashboard/ivis-logo.svg';
import {Link, useNavigate} from 'react-router-dom'


const LOGIN_URL = '/auth';

const Login = () => {
const handleChange = () => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
}
const handleSubmit = () => {
    e.preventDefault();

    try {
        // await axios.post("http://localhost:8800/login/login", inputs);
        await login(inputs)
        navigate("/dashboard");
    } catch (err) {
        setError(err.response.data)
    }
};
  return (
    <section className="form-wrapper">
      <div className="form">
        <a href="/" className="ivis-logo-link"><img src={logo} alt="ivis Logo" className="ivis-logo" /></a>
        <h3 className="header">Login</h3>
        <form onSubmit={handleSubmit} className="login-form">

          <label htmlFor="username">Nutzername:</label>
          <input 
            type="text" 
            // id="username"
            name="username" 
            // ref={userRef} 
            // value={user} 
            placeholder="Nutzername"
            onChange={handleChange} 
            required/>

          <label htmlFor="username">Passwort:</label>
          <input 
            type="password" 
            // id="password"
            name="password" 
            placeholder="Passwort"
            // value={pwd} 
            onChange={handleChange} 
            required/>

          <button type="submit" onClick={handleSubmit}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line>
            </svg> */}Anmelden
          </button>
        </form>
        {err && <p>{err}</p>}
        <h3 className="header">Neu hier?</h3>
        <Link className="linkButton " to="/">Jetzt registrieren</Link>
      </div>
    </section>
  )
}

export default Login
