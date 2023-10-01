const express = require('express')
const User = require('../models/User');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

const router = express.Router()

const secret = "secret"

router.post('/register', async (req, res, next)=>{
    const {username, email, password} = req.body
    const user = await User.findOne({where: {
        [Op.or]: [
            {username: username},
            {email: email},
        ],
    }})

    if (!user){
        const newUser = await User.create({
            username: username,
            email: email,
            password: password
        })

        res.status(201).send(newUser)
    }else{
        res.status(409).send({
    
            error: {
                type: 'username-conflict'
            }
        })
    }

})

router.get('/checkname/:username', async (req, res, next) => {
    const { username } = req.params

    const user = await User.findOne({attributes:['username'],
        where:{
            username: username
        }
    })

    if (user){
        res.send({status: 'taken'})
    }else{
        res.send({status: 'available'})
    }
})

router.get('/checkemail/:email', async (req, res, next) => {
    const { email } = req.params

    const user = await User.findOne({attributes:['email'],
        where:{
            email: email
        }
    })

    if (user){
        res.send({status: 'taken'})
    }else{
        res.send({status: 'available'})
    }
})

router.get('/user', (req, res, next) => {
    const token = req.headers["x-access-token"]

    if(!token) return res.status(401).send({
        error: "401",
        message: "A acess token is required",
        detail: "A acess token is required in request"
    })

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(500).send({
            error: "500",
            message: "Server authentication has failed",
            detail: "Something went wrong in server authentication"
        });
        
        res.status(200).send(decoded);
      })

})


module.exports = router