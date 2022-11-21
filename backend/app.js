const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
app.use(express.urlencoded());
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
}))

app.use(flash());

dotenv.config({ path: "./config.env" });
require("./db/conn");


const PORT = process.env.PORT;

const staticpath = path.join(__dirname, "../frontend/public");
const templatepath = path.join(__dirname, "../frontend/template/views");
const partialpath = path.join(__dirname, "../frontend/template/partials");

app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);

app.use(express.static(staticpath));

app.use(express.json());
app.use(require("./router/auth"));

app.get("/home", (req, res) => {
    res.status(201).render("home", {
        serversuccess: req.flash('server-success')
    });
});

app.get("/register", (req, res) => {
    res.status(201).render("register");
})

app.get("/signin", (req, res) => {
    res.status(201).render("signin", {
        servererror: req.flash('server-error')
    });
})

app.listen(PORT, () => {
    console.log(`this website will run on port number ${PORT}`);
})