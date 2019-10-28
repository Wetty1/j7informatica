const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        console.log(req.user.nivel)
        res.render('main/index', { user: req.user.nome, admin: req.user.nivel })
    } else {
        res.render('main/index')
    }
    
})

module.exports = router