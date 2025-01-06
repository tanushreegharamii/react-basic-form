const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const analyzeUserModel = require('./Model/Usermodel');

const app = express();
app.use(express.json())
app.use(cors())
const port = 3000;
const db_url = ('mongodb+srv://tanushri8981:JdCqha5xXvEkWYrw@cluster0.d1wo2ao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
mongoose.connect(db_url)
    .then(() => {
        console.log("DB connected successfully.")
    })
    .catch((err) => {
        console.log("Error occurred !", err)
    })





// post users

app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
    const userExist = await analyzeUserModel.findOne({ email });

    if (userExist) {
        console.log("User already exists")
        return res.status(400).send("User already exists");
       
    }
    let users = new analyzeUserModel({username, email, password});
    await users.save()
    res.status(201).send("User created successfully");
    console.log("User created successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

app.post("/login", async (req, res) => {
   try {
    const { email, password } = req.body;
    const userExist = await analyzeUserModel.find({email, password})

    if (!userExist) {
        return res.status(400).send("User is not register or invalid credentials");
    }
    else{
        res.status(201).send("User Logged In Successfully");
    console.log("User Logged In Successfully")
    }
   } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server Error")
   }
})


// get 

app.get("/getusers", async (req, res) => {
    const individualUser = await analyzeUserModel.findOne({username, email, password})

})




app.listen(port, () => {
    console.log("App is listening on", port)
})

