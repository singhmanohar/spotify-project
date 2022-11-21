const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");

const User = require("../model/userSchema");

router.get("/", (req, res) => {
    res.status(200).render("register")
})


router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, password, cpassword } = req.body;

        if (!name || !email || !phone || !password || !cpassword) {
            return res.status(401).send({ err: "pleasse fill data properly" });
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(402).send({ err: "email already exist" });
        } else if (password != cpassword) {
            return res.status(403).send({ err: "password did not match" });
        } else {
            const newUser = new User({ name, email, phone, password, cpassword });
            await newUser.save();
            return res.status(2002).json({ message: "registered succesfully" });
        }
    } catch (error) {
        console.log(error);
    }
})

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            req.flash('server-error', "please fill data properlly");
            return res.status(405).redirect("signin");
        }

        const userSignin = await User.findOne({ email: email });

        if (userSignin) {

            const passwordExist = await bcryptjs.compare(password, userSignin.password);

            if (!passwordExist) {
                req.flash('server-error', "data not exist");
                return res.status(405).redirect("signin");

            } else {
                req.flash('server-success', "User added succcessfully");
                return res.status(200).redirect("home");
            }

        } else {
            return res.status(406).json({ err: "data not exist" });
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;