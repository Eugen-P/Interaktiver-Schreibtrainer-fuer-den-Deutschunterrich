import { useState } from "react";
import axios from '../client/src/api/axios';
import {Link, useNavigate} from 'react-router-dom'
import React from 'react';
// import './register.scss';
import logo from '../Dashboard/ivis-logo.svg';


const Register = () => {


    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
    })
    
    const [err, setError] = useState(null)
    
    const navigate = useNavigate()

    const handleChange = e => {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    
    console.log(inputs)

    const handleSubmit = async e => {
        e.preventDefault();
    
        try {
            await axios.post("http://localhost:8800/register/register", inputs);
            navigate("/login");
            // console.log(res);
        } catch (err) {
            setError(err.response.data)
        }
    };
    
 
    return (

        <section className="form-wrapper">
        <div className="form">
            <a href="/" className="ivis-logo-link">
                <img src={logo} alt="ivis Logo" className="ivis-logo" />
              </a>
              <h3 className="header">Konto erstellen</h3>
            <form className="login-form">
            <label htmlFor="username">Nutzername:</label>
                <input type="text" placeholder="Nutzername" name="username" onChange={handleChange} required/>

                <label htmlFor="email">E-Mail:</label>
                <input type="email" placeholder="E-Mail" name="email" onChange={handleChange} required/>

                <label htmlFor="password">Passwort:</label>
                <input type="password" placeholder="Passwort" name="password" onChange={handleChange} required/>

                <button type="submit" onClick={handleSubmit}> Registrieren</button>
            </form>
               {err && <p>{err}</p>}
               <h3 className="header">Sie haben ein Konto?</h3>
                <Link className="linkButton " to="/login">Jetzt anmelden</Link>
         

        </div>
      </section>
        
    );
}
export default Register;