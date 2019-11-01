const Produtos = require('./../../models/Produto')

module.exports = {
    
    async all (req, res){
        console.log(req.body)
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

    async desativar (req, res) {
        //console.log('method: ', req.params)
        //await Produtos.findById(req.params.id)
        
        const prod = await Produtos.findById(req.params.id);

        await Produtos.deleteOne({ _id: prod._id });

        doc.ativo = false;
        await doc.save(); 

        return res.redirect('/admin')
    },

    async edit (req, res) {
        console.log('method: ' )
        return res.redirect('/admin')
    }
} 