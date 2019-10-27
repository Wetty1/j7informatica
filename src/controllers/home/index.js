const express = require('express')
const router = express.Router()
const User = require('./../../models/User')

router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        console.log(req.user)
        res.render('main/index', { user: req.user.nome })
    } else {
        res.render('main/index')
    }
    
})

module.exports = router