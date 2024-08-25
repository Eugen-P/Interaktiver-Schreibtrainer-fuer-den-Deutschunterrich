import Register from '../../code/Register';
import Login from '../../code/Login';
import Dashboard from './components/Dashboard/Dashboard';
import DashboardBlank from './components/Dashboard/DashboardBlank';
import Sidebar from './components/Dashboard/Sidebar';
import { Route, RouterProvider, useLocation, Routes, createBrowserRouter } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import './App.scss';

// const router = createBrowserRouter([
//   {
//     path: "/dashboard",
//     element: <Dashboard/>
//   },
//   {
//     path: "/login",
//     element: <Login/>
//   },
//   {
//     path: "/register",
//     element: <Register/>
//   },
  
// ])


function App() {
  const [show, setShow] = useState(false)
  // const [notshow, setNotShow] = useState(false)
  const location = useLocation();
  const isDashboardPage = location.pathname.startsWith('/dashboard');

//   const handleResize = () => {
//     setShow(window.innerWidth >= 1020);
//   };



//   return (
//     <main className={`App ${show ? '' : 'show'}`}>

// <button onClick={()=> {
//       setShow(current => !current);
//     }} 

//     className={`sidebarButton ${!isDashboardPage ? 'notshow' : ''}`}>
      


const handleResize = () => {
  setShow(window.innerWidth >= 1250);
};

useEffect(() => {
  // Initial check and event listener setup
  handleResize();
  window.addEventListener('resize', handleResize);

  // Clean up the event listener
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

const toggleSidebar = () => {
  setShow(current => !current);
};

return (
  <main className={`App ${show ? 'show' : ''}`}>
    <button
      onClick={toggleSidebar}
      className={`sidebarButton ${!isDashboardPage ? 'notshow' : ''}`}>
      {/* Button content */}


      <svg className='svgEdit' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30">
  <g id="Icon_feather-sidebar" data-name="Icon feather-sidebar" transform="translate(-3 -3)">
    <path id="Path_15" data-name="Path 15" d="M7.5,4.5h21a3,3,0,0,1,3,3v21a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3V7.5a3,3,0,0,1,3-3Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
    <path id="Path_16" data-name="Path 16" d="M13.5,4.5v27" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
  </g>
</svg>

    </button>

      {/* <Login />
      <Register /> */}

      {/* <RouterProvider router={router}/> */}

      <Routes>
        <Route path="/login" element={<Login/>}/>

        <Route path="/" element={<Register/>}/>

        <Route path="/dashboard" 
        element={<><Sidebar/><DashboardBlank/></>}/>
        
        <Route path="/dashboard/:id" 
        element={<><Dashboard/><Sidebar/></>}/>
      </Routes>

    </main>
  );
}

export default App;