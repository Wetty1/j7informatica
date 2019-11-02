const Produtos = require('./../../models/Produto')

module.exports = {
    
    async all (req, res){
        const produtos = await Produtos.find()

        return res.render('admin/produtos', {produtos: produtos})
    },

    async store (req, res) { 
        const { nome, descricao, valor } = req.body
        const { filename } = req.file

        await Produtos.create ({
            nome: nome,
            descricao: descricao,
            valor: valor,
            thumbnail: filename
        }).catch(err => console.error(err))
           
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
            // await Produtos.updateOne({_id: req.params.id}, 
            //     {nome: nome, descricao: descricao, valor: valor, thumbnail: filename, ativo: true},
            //     { runValidators: false })
        } else {
            objUpdate.ativo = false
        }
        
        console.log('objteste', objUpdate)
        await Produtos.updateOne({_id: req.params.id}, 
            objUpdate,
            { runValidators: false })

        return res.redirect('/admin')
    }
} 