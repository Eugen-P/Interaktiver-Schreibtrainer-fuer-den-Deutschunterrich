import express from "express"
import {db} from "./db.js"


// import {currentUser} from "../"



const router = express.Router()

router.get("/posts", (req, res) => {

    const userId = req.query.userid; // Get the user's ID from the query parameter

    const q = `SELECT * FROM tabs WHERE userid = ?`; // Modify the query to include WHERE clause
    db.query(q, [userId], (err, data) => {
        if (err) return res.send(err);
        return res.status(200).json(data);
    });

})



router.get("/posts/:id", (req, res) => {
    
    const tabId = req.params.id;
    const answer = req.params.answer;

// console.log("text.js")
// console.log("tab id = " + tabId)
// console.log("answer get1: " + answer)

    const q = `SELECT * FROM tabs WHERE id = ? `; // Modify the query to include WHERE clause
    db.query(q, [tabId], (err, data) => {
        if (err) return res.send(err);
        console.log("answer get1: " + answer)
        console.log(data)
        return res.status(200).json(data[0]);
        
    });
})



router.post("/posts/", async (req, res) => {
    const newTabName = req.body.tabname;
    const userId = req.body.userid; // Extract user ID from the request body
    const question = req.body.question; // Extract user ID from the request body
//   console.log("topic " + question)


    const q = `INSERT INTO tabs (tabname, userid, question) VALUES (?, ?, ?)`;
    db.query(q, [newTabName, userId, question], (err, result) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send("Tab created successfully");
    });

})

router.post("/posts/:id", async (req, res) => {
    const answer = req.body.answer;
    const analys = req.body.analys; 
    const tabId = req.params.id;
    const submitted = req.body.submitted;


  console.log("answer " + answer)
  console.log("analys " + analys)
  console.log("sub " + submitted)
  console.log("-----------------------------------")


    // const q = `INSERT INTO tabs (analys, answer) VALUES (?, ?) WHERE id = ?`;
    const q = `UPDATE tabs SET answer = ?, analys = ?, submitted = ? WHERE id = ?`;
    db.query(q, [answer, analys, submitted, tabId], (err, result) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send("Tab created successfully");
    });

})



router.delete("/posts/:id", (req, res) => {
    const tabId = req.params.id;
    const q = `DELETE FROM tabs WHERE id = ?`;
    db.query(q, [tabId], (err, result) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send("Tab deleted successfully");
    });
})



router.put("/posts/:id", (req, res) => {
    const tabId = req.params.id;
    const newTabName = req.body.tabname; // Make sure to match the field name sent from the frontend

    const q = `UPDATE tabs SET tabname = ? WHERE id = ?`;
    db.query(q, [newTabName, tabId], (err, result) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send("Tab name updated successfully");
    });
})




export default router 