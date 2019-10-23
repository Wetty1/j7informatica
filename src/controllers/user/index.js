const express = require('express')
const router = express.Router()


module.exports = (passport) =>  { 
    router.get('/', (req, res) => {
        console.log('deu bom')
    })

    router.get('/login', (req, res) => {
        res.render('auth/login')
    })

    router.post('/login', passport.authenticate('local-singin', {
        successRedirect: './..',
        failureRedirect: './',
    }))

    router.get('/register', (req,res) => {
        res.render('auth/cadastro')
    })

    router.post('/register', passport.authenticate('local-singup', {
        successRedirect: '/',
        failureRedirect: '/user/register'
    }))

    return router
}


