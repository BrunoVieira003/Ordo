const express = require('express')
const User = require('../models/User');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

const router = express.Router()

const secret = "secret"

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({
        where:{
            email: email
        }
    })

    if(user && user.password == password){
        delete user.password
        res.status(200).send({
            token: jwt.sign(user.toJSON(), secret)
        })
    }
    else{
        res.status(400).send({
            error: "400",
            message: "Incorrect username and password",
            detail: "Ensure that the username and password included in the request are correct"
        })
    }
})


module.exports = router