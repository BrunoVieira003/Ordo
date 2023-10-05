const express = require('express')
const User = require('../models/User');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const validateToken = require('../middlewares/tokenValidation');

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
            message: 'User already exists'
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

router.get('/user', validateToken, (req, res, next) => {
    res.status(200).json(req.userInfo)

})


module.exports = router