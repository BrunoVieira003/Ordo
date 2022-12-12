const login_required = (req, res)=>{
    if (!req.session.user) {
        req.session.message = {info: 'Você precisa fazer login para acessar essa página!', type: 'error'}
        res.redirect('/login')
    }
}

const only_anonymous = (req, res)=>{
    if (req.session.user){
        res.redirect('/dashboard')
    }
}

module.exports = { login_required, only_anonymous }