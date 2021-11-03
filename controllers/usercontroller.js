const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { UniqueConstraintError } = require("sequelize/types");

router.post("/create", async (req, res) => {

    let { username, password } = req.body.user;
    try {
        const newUser = await User.create({
            username,
            password: bcrypt.hashSync(password, 13),
        });

        let token = jwt.sign({id: newUser.id}, "i_am_secret", {expiresIn: 60 * 60 * 24});

        res.status(200).json({
            message: "User successfully saved",
            user: newUser,
            sessionToken: token
        })
    }   catch (err) {
            res.status(500).json({
                message: "Failed to save User",
            });
        }
})

router.post("/login", async (req, res) => {
    let { username, password } = req.body.user;

    try {
        const loginUser = await User.findOne({
            where: {
                username: username,
            },
        });

        if(loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if(passwordComparison) {

                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in!",
                    sessionToken: token
                })
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                });
             } 
        } else {
            res.status(401).json({
                message: "Incorrect email or password"
            })
        }
    } catch(error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
});

module.exports = router;