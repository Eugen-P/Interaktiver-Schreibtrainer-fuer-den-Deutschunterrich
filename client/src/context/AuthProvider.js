
import { createContext, useState, useEffect } from "react"
import axios from 'axios';

export const AuthContext = createContext() 

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    
    const login = async(inputs) => {
        const res = await axios.post("http://localhost:8800/login/login", inputs, {withCredentials: true});
        setCurrentUser(res.data)
    }
    const logout = async(inputs) => {
      console.log("autprovider")
        await axios.post("http://localhost:8800/logout/logout");
        setCurrentUser(null)
        
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);
    
    return (
        <AuthContext.Provider value={{ currentUser, login, logout}}>
        {children}
        </AuthContext.Provider>
    );
    
}


// import { createContext, useState } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(null);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export default AuthContext;
