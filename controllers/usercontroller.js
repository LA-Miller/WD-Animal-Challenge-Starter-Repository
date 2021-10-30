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
            password
        });

        res.status(200).json({
            message: "User successfully saved",
            user: newUser
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
        
    }
})

module.exports = router;