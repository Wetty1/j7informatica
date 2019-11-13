const express = require('express')
const router = express.Router()
const Produtos = require('./../../models/Produto')

router.get('/', async (req, res) => {
    let produtos = await Produtos.find({ativo: true})

    if(req.isAuthenticated()) {
        res.render('main/index', { user: req.user.nome, admin: req.user.nivel, produtos: produtos})
    } else {
        res.render('main/index', {produtos: produtos})
    }
})

router.get('/produto/:id', async (req, res) => {
    const produto = await Produtos.findById(req.params.id)

    console.log(produto)
    res.render('main/produto', {produto: produto})
})

router.get('/pesquisa', async (req, res) => {
    console.log(req.query.search)

    const produtos = await Produtos.find({nome: new RegExp('^'+req.query.search+'$', "i")})

    console.log(produtos)
    
    if(req.isAuthenticated()) {
        res.render('main/index', { user: req.user.nome, admin: req.user.nivel, produtos: produtos})
    } else {
        res.render('main/index', {produtos: produtos})
    }
    
})

module.exports = router