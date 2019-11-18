const express = require('express')
const path = require('path')
const router = express.Router()
const multer = require('multer')
const uploadConfig = require('../../config/upload')

const Produtos = require('./produtos')
const Pedidos = require('./pedidos')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, path.resolve(__dirname,'..','..','..','uploads'))
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const name = path.basename(file.originalname, ext)
        cb (null, `${name}-${Date.now()}${ext}`)
    }
})

const upload = multer({ storage }).fields([
    {name: 'thumbnail'},
    {name: 'thumbnail2'},
    {name: 'thumbnail3'},
    {name: 'thumbnail4'}
])

router.get('/', (req, res) => res.redirect('/admin/produtos'))
// // SUMARIO
/* 
LISTAGEM
ADICIONAR
DELETAR
EDITAR 
*/

/* LISTAGEM */

router.get('/produtos', Produtos.all)

/* ADICIONAR */

router.post('/addproduto', upload, Produtos.store)

router.post('/addestoque', Produtos.addEstoque)

/* EDITAR */

router.put('/editproduto/:id', upload, Produtos.edit)

router.put('/desativarproduto/:id', Produtos.desativar)
router.put('/ativarproduto/:id', Produtos.ativar)

module.exports = router
