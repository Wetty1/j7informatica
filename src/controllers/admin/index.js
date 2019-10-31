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

router.get('/produtos', Produtos.all)

// router.get('/pedidos', Pedidos.all)

router.post('/addproduto', upload.single('thumbnail'), Produtos.store)

// router.post('/pedidos', Pedidos.store)

module.exports = router
