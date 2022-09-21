const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const userRoutes = require('./routes/user-routes');
const session = require('express-session');
const filestore = require("session-file-store")(session);

const app = express();

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(
    session({
        name: "session-1",
        secret: "thisIsOurSecret",
        saveUninitialized: false,
        resave: false,
        store: new filestore(),
    })
);

app.use(function (req, res, next) {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});


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
    if (req.session.user) {
        if (req.session.user.userType === 'user') {

            res.redirect('/users/user');
        }
        else {
            res.redirect('/users/admin');
        }
    }
    else {

        res.redirect('/users/signin');
    }
})


app.use('/users', userRoutes);

// app.get('/signup', (req, res) => {
//     res.render('signup')
// })


app.get('/home', (req, res) => {
    res.render('index');
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
