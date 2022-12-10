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
        req.session.message = {info: "Usuário não encontrado! Tente novamente", type: 'error'}
        res.redirect('/login')
    }else if(user.password != password){
        req.session.message = {info: "Senha incorreta! Tente novamente", type: 'error'}
        res.redirect('/login')
    }else{
        req.session.user = user
        req.session.message = {info: "Você entrou!", type: 'success'}
        res.redirect('/');
    }
})

router.get('/register', (req, res, next)=>{
    res.render('users/register');
})

router.post('/register', async (req, res, next)=>{
    const {username, email, password, c_password} = req.body
    if (password != c_password) {
        req.session.message = {info: 'As senhas não combinam! Digite novamente', type: 'error'}
        res.redirect('/register')
    }else{
        try {
            const user = await User.create({
                name: username,
                password: password,
                email: email
            })
            req.session.message = {info: "Conta criada com sucesso!", type: 'success'}
            res.redirect('/login')
        } catch(error){
            if (error.name == 'SequelizeUniqueConstraintError') {
                if (error.errors[0].path == 'name') {
                    req.session.message = {info: 'Nome de usuário já está em uso! Tente outro', type: 'error'}
                    res.redirect('/register')
                }else{
                    req.session.message = {info: 'Esse email já pertence a uma conta!', type: 'error'}
                    res.redirect('/register')
                }
            }
        }
    }
    
})

module.exports = router