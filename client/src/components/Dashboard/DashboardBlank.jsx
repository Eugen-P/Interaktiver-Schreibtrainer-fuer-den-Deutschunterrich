import { useRef, useState, useEffect, useContext } from 'react';
import {AuthContext} from '../../context/AuthProvider';
import axios from '../../api/axios';
import Dashboard from '../Dashboard/Dashboard';
// import './login.scss';
import logo from '../Dashboard/ivis-logo.svg';
import {Link, useNavigate} from 'react-router-dom';
// import '../Login/login.scss';


const Login = () => {


  return (
      <section className="dashboardBlank" >
        <div className="info" style={{display: 'none'}}>
        <div class="arrow-left">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className="infoText">Create new tab to continue</div>

        </div>
         <a href="/" className="ivis-logo-link">
                <img src={logo} alt="ivis Logo" className="ivis-logo" />
        </a>
      </section>
    
  )
}

export default Login
