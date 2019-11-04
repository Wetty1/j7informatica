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
            if(saidas.length > 1) {
                estoque = {estoque: entradas[0].quantidade - saidas[0].quantidade}
            } else { 
                estoque = {estoque: entradas[0].quantidade}
            }


            obj = Object.assign(produtos[i], estoque)
            obj.estoque = estoque
            prodsx.push(obj)

            console.log('obj: ', obj)
            
        }
        console.log('prods: ', prodsx)
        
        return res.render('admin/produtos', {produtos: produtos})
    },

    async store (req, res) { 
        const { nome, descricao, valor } = req.body
        const { filename } = req.file

        const produto = await Produtos.create ({
            nome: nome,
            descricao: descricao,
            valor: valor,
            thumbnail: filename,
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