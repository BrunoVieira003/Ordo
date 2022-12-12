const express = require('express')
const User = require('../models/User')
const { login_required } = require('../utils/users')

const router = express.Router()

router.get('/dashboard', async (req, res, next)=>{
    login_required(req, res)
    res.render('dashboard/overview');
})

module.exports = router