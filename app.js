const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Contol-Allow-Orgin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
})
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('signin');
})
app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('*', (req, res, next) => {
    res.send("404, Not found").status(404);
})

mongoose.connect('mongodb://localhost:27017/sms').then(() => {
    app.listen(5000, () => {
        console.log('listening')
    }
    )
}).catch((error) => {
    console.log(error);
    throw new Error(error)
})
