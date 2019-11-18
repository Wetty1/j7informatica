const express = require('express')
const router = express.Router()
const Produtos = require('./../../models/Produto')
const Saida = require('../../models/Compra')
const Entrada = require('../../models/Entrada_produto')
const Compra = require('../../models/Compra')

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
    let prodsx = []
        
    let obj = {}
    const entradas = await Entrada.aggregate([
        { $match: {produto: produto._id}},
        { $group: {_id: produto._id, quantidade: {$sum: "$quantidade"}}}
    ])

    const saidas = await Saida.aggregate([
        { $match: {produto: produto._id}},
        { $group: {_id: produto._id, quantidade: {$sum: "$quantidade"}}}
    ])
    
    let estoque = {}
    if(saidas.length > 1) {
        estoque = entradas[0].quantidade - saidas[0].quantidade
    } else { 
        estoque = entradas[0].quantidade
    }

    obj = {
        _id: produto._id,
        nome: produto.nome,
        descricao: produto.descricao,
        valor: produto.valor,
        thumbnail: produto.thumbnail,
        thumbnail2: produto.thumbnail2,
        thumbnail3: produto.thumbnail3,
        ativo: produto.ativo,
    }
    obj.estoque = estoque
    prodsx.push(obj)


    console.log(produto)
    if(req.isAuthenticated()) {
        res.render('main/produto', { user: req.user.nome, admin: req.user.nivel, produto: obj})
    } else {
        res.render('main/produto', {produto: obj})
    }
})

router.get('/pesquisa', async (req, res) => {
    let nome = req.query.search
    const produtos = await Produtos.find({nome: new RegExp(nome, 'i')})

    console.log(produtos)
    
    if(req.isAuthenticated()) {
        res.render('main/index', { user: req.user.nome, admin: req.user.nivel, produtos: produtos})
    } else {
        res.render('main/index', {produtos: produtos})
    }
    
})

router.get('/meuspedidos', async (req, res) => {
    if(!req.isAuthenticated()){
        res.redirect('/user/login')
        return
    }
    const { _id } = req.user
    const compras = await Compra.find({usuario: _id})

    console.log(compras)

    res.render('main/meuspedidos', {compras: compras, admin: req.user.nivel, user: req.user.nome})
})

module.exports = router