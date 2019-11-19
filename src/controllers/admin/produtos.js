const Produtos = require('./../../models/Produto')
const Entrada = require('./../../models/Entrada_produto')
const Saida = require('./../../models/Item_compra')

module.exports = {
    
    async all (req, res){
        let produtos = await Produtos.find()

        let prodsx = []
        
        for(let i in produtos) {
            let obj = {}
            const entradas = await Entrada.aggregate([
                { $match: {produto: produtos[i]._id}},
                { $group: {_id: produtos[i]._id, quantidade: {$sum: "$quantidade"}}}
            ])

            const saidas = await Saida.aggregate([
                { $match: {produto: produtos[i]._id}},
                { $group: {_id: produtos[i]._id, quantidade: {$sum: "$quantidade"}}}
            ])
            
            let estoque = {}
            if(saidas.length > 0) {
                estoque = entradas[0].quantidade - saidas[0].quantidade
            } else { 
                estoque = entradas[0].quantidade
            }

            obj = {
                _id: produtos[i]._id,
                nome: produtos[i].nome,
                descricao: produtos[i].descricao,
                valor: produtos[i].valor,
                thumbnail: produtos[i].thumbnail,
                ativo: produtos[i].ativo,
            }
            obj.estoque = estoque
            prodsx.push(obj)

            
        }
        
        return res.render('admin/produtos', {layout: false, produtos: prodsx})
    },

    async store (req, res) { 
        const { nome, descricao, valor } = req.body
        const filename = req.files.thumbnail[0].filename
        const filename2 = req.files.thumbnail2[0].filename
        const filename3 = req.files.thumbnail3[0].filename
        const filename4 = req.files.thumbnail4[0].filename

        const produto = await Produtos.create ({
            nome: nome,
            descricao: descricao,
            valor: valor,
            thumbnail: filename,
            thumbnail2: filename2,
            thumbnail3: filename3,
            thumbnail4: filename4,
            ativo: true,
        }).catch(err => console.error(err))
           
        await Entrada.create({
            produto: produto['_id'],
            quantidade: 0,
            data: Date.now(),
        })

        return res.redirect('/admin/produtos')
    },

    async desativar (req, res) {
        await Produtos.updateOne({_id: req.params.id}, {ativo: false}, { runValidators: false })
        const prod = await Produtos.findById(req.params.id);
        console.log(prod)
        
        return res.redirect('/admin')
    },

    async ativar (req, res) {
        await Produtos.updateOne({_id: req.params.id}, {ativo: true}, { runValidators: false })
        const prod = await Produtos.findById(req.params.id);
        console.log(prod)
        
        return res.redirect('/admin')
    },

    async edit (req, res) {
        console.log('body: ', req.body)
        console.log('file: ', req.file)
        const { nome, descricao, valor, ativo } = req.body

        const objUpdate = {
            nome: nome, 
            descricao: descricao, 
            valor: valor, 
        }
        
        if (req.file != undefined && req.file !== "") {
            const { filename } = req.file
            objUpdate.thumbnail = filename
        }
        if(ativo != undefined) {
            objUpdate.ativo = true
        } else {
            objUpdate.ativo = false
        }
        
        console.log('objteste', objUpdate)
        await Produtos.updateOne({_id: req.params.id}, 
            objUpdate,
            { runValidators: false })

        return res.redirect('/admin')
    },

    async addEstoque (req, res) {
        const { id } = req.body
        const { quantidade } = req.body
        
        await Entrada.create({
            produto: id,
            quantidade: quantidade,
            data: Date.now(),
        })

        return res.redirect('/admin')
    }
} 