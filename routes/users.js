const express = require('express')
const User = require('../models/User')
const { Op } = require("sequelize");

const router = express.Router()

router.get('/login', async (req, res, next)=>{
    res.render('users/login');
})

router.post('/login', async (req, res, next)=>{
    const {username, password} = req.body
    const user = await User.findOne({where:{
        [Op.or]: [{name: username}, {email: username}]
    }})
    if(!user){
        req.session.message = "Usuário não encontrado! Tente novamente"
        res.redirect('/login')
    }else if(user.password != password){
        req.session.message = "Senha incorreta! Tente novamente"
        res.redirect('/login')
    }else{
        req.session.user = user
        res.render('home');
    }
})

router.get('/register', (req, res, next)=>{
    res.render('users/register');
})

router.post('/register', async (req, res, next)=>{
    const {username, email, password, c_password} = req.body
    if (password != c_password) {
        req.session.message = 'As senhas não combinam! Digite novamente'
        res.redirect('/register')
    }else{
        try {
            const user = await User.create({
                name: username,
                password: password,
                email: email
            })
            res.redirect('/login')
        } catch(error){
            if (error.name == 'SequelizeUniqueConstraintError') {
                if (error.errors[0].path == 'name') {
                    req.session.message = 'Nome de usuário já está em uso! Tente outro'
                    res.redirect('/register')
                }else{
                    req.session.message = 'Esse email já pertence a uma conta!'
                    res.redirect('/register')
                }
            }
        }
    }
    
})

module.exports = router