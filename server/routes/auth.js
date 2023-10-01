const express = require('express')
const User = require('../models/User');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

const router = express.Router()

const secret = "secret"

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({attributes:['id', 'username', 'email', 'password'],
        where:{
            email: email
        }
    })

    if(user && user.password == password){
        delete user.password
        delete user.email
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