const express = require('express')
const router = express.Router()

module.exports = (passport) =>  { 
    router.get('/', (req, res) => {
        console.log('deu bom')
    })

    router.get('/login', (req, res) => {
        if(req.isAuthenticated()){
            res.redirect('/')
            return;
        }
        res.render('auth/login')
    })

    router.post('/login', passport.authenticate('local-singin', {
        successRedirect: '/',
        failureRedirect: './login',
    }))

    router.get('/register', (req,res) => {
        res.render('auth/cadastro')
    })

    router.post('/register', passport.authenticate('local-singup', {
        successRedirect: '/',
        failureRedirect: '/user/login'
    }))

    router.get('/logout', (req, res) => {
        req.logout()

        return res.redirect('/')
    })

    return router
}


