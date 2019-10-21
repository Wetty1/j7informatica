const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('deu bom')
})

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req,res) => {
    res.render('auth/cadastro')
})


module.exports = router