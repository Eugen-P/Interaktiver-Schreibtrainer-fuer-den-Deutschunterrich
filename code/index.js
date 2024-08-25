import express from 'express'
import postRoutes from './text.js'
import loginRoutes from '../routes/login.js'
import registerRoutes from './register.js'
import cors from "cors";
import cookieParser from 'cookie-parser';

import {db} from "./db.js" 


const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin === 'http://localhost:3000') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));


app.use("/posts", postRoutes)
app.use("/login", registerRoutes)
app.use("/logout", registerRoutes)
app.use("/register", registerRoutes)

app.listen(8800, () =>{
    console.log("Connected!")
})