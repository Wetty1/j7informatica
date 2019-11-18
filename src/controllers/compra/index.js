const express = require('express')
const router = express.Router()
const Compra = require('../../models/Compra')
const Item_carrinho = require('../../models/Item_carrinho')
const Item_compra = require('../../models/Item_compra')

router.get('/carrinho', (req, res) => {
    //const id_user = req.user._id
    //const itens_carrinho = Item_carrinho.find({usuario: id_user})
  //, {itens_carrinho: itens_carrinho}
    res.render('main/carrinho')
})

router.post('/', async (req, res) => {
    if(!req.user){
        res.redirect('/')
        return;
    }
    
    Compra.create({
        usuario: req.user._id,
        data: Date.now(),
        valorTotal: req.body.total,
    }).then(compra => {
        console.log(req.body.id_produto)
        Item_compra.create({
            compra: compra._id,
            produto: req.body.id_produto,
            quantidade: req.body.qtd,
        })
    })
    res.redirect('/')
})

router.post('/addcarrinho', async (req, res) => {
    Item_carrinho.create({
        usuario: req.user._id,
        produto: req.body.id_produto,
        quantidade: req.body.qtd,
    })

    res.redirect('/')
})

module.exports = router