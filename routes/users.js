const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.get('/login', async (req, res, next)=>{
    res.render('users/login');
})

router.get('/register', (req, res, next)=>{
    res.render('users/register');
})

module.exports = router