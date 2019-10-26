const express = require('express')
const router = express.Router()
const User = require('./../../models/User')

router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        User.findById(req.user).then(user => {
           res.render('main/index', { user: user.nome })
        })
    } else {
        res.render('main/index')
    }
    
})

module.exports = router