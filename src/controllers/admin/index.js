const express = require('express')
const router = express.Router()
const multer = require('multer')
const uploadConfig = require('../../config/upload')

const Produtos = require('./produtos')
const Pedidos = require('./pedidos')

const upload = multer(uploadConfig)

router.get('/produtos', Produtos.all)

// router.get('/pedidos', Pedidos.all)

router.post('/addproduto', upload.single('thumbnail'), Produtos.store)

// router.post('/pedidos', Pedidos.store)

module.exports = router
