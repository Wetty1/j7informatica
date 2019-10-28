const express = require('express')
const router = express.Router()
    
router.get('/produtos', (req, res) => {
    res.render('admin/produto')
})

router.get('/pedidos', (req, res) => {
    res.render('admin/pedidos')
})

router.post('/produtos', (req, res) => {
    res.render('admin/produto')
})

router.post('/pedidos', (req, res) => {
    res.render('admin/pedidos')
})

module.exports = router
