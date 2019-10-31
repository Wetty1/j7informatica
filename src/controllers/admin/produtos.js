const Produtos = require('./../../models/Produto')

module.exports = {
    
    async all (req, res){
        const produtos = await Produtos.find()

        return res.render('admin/produtos', {produtos: produtos})
    },
    async store (req, res) { 
        const { nome, descricao, valor } = req.body
        const { filename } = req.file

        console.log("------------ ", nome, descricao, valor, filename)

        await Produtos.create ({
            nome: nome,
            descricao: descricao,
            valor: valor,
            thumbnail: filename
        }).catch(err => console.error(err))
           
        return res.redirect('/admin/produtos')
    },
    async delete (req, res) {
        return res.redirect('/')
    }
} 