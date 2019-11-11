const express = require('express')
const router = express.Router()
const Produtos = require('./../../models/Produto')
require('./all')

router.get('/', async (req, res) => {
    if(req.isAuthenticated()) {
        let produtos = await Produtos.find({ativo: true})

        console.log(produtos)

        res.render('main/index', { user: req.user.nome, admin: req.user.nivel, produtos: produtos})
    } else {
        let produtos = await Produtos.find({ativo: true})

        res.render('main/index', {produtos: produtos})
    }
})

router.get('/produto/:id', async (req, res) => {
    const produto = await Produtos.findById(req.params.id)

    console.log(produto)
    res.render('main/produto', {produto: produto})
})

module.exports = router