import {db} from "./db.js" 
import bcrypt from "bcrypt";

import express from "express"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/register", (req, res) => {
    //chech if user exist
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(q, [req.body.email, req.body.username], (err,data) => {
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("User already exist");

        //  hash the passwort and create a user

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ]
        db.query(q, [values], (err, data) =>{
            if (err) return res.json(err);
            return res.status(200).json("user has been created");
        })
    })
})
router.post("/login", (req, res) => {

    //chech user

    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.json(err);

        if(data.length === 0) return res.status(404).json("User not found");

        //check password 

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if(!isPasswordCorrect) return res.status(400).json("Wrong user name or password")

        const token = jwt.sign({id:data[0].id}, "jwtkey");
        const {password, ...other} = data[0]

        
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other)
    })


})


router.post("/logout", (req, res) => {
    console.log("logouting...")
try {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure:true 
    }).status(200).json("user has been logged out.")
    
} catch (error) {
    console.log("nooooo...")
    
}

})

export default router 