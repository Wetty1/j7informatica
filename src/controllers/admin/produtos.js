const Produtos = require('./../../models/Produto')

module.exports = {
    
    async all (req, res){
        const produtos = await Produtos.find()

        return res.render('admin/produtos', {produtos: produtos})
    },
    async store (req, res) { 
        const { nome, descricao, valor } = req.body

        await Produtos.create({
            nome: nome,
            descricao: descricao,
            valor: valor,
            thumbnail: req.file
        })


        return res.redirect('/admin/produtos')
    },
} 