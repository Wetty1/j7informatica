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

const upload = multer({ storage })

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
// router.get('/pedidos', Pedidos.all)

/* ADICIONAR */

router.post('/addproduto', upload.single('thumbnail'), Produtos.store)
// router.post('/pedidos', Pedidos.store)

/* DELETAR */

router.put('/desativarproduto/:id', Produtos.desativar)
// router.delete()

/* EDITAR */

router.put('/editproduto/:id', upload.single('thumbnail'), Produtos.edit)

module.exports = router
