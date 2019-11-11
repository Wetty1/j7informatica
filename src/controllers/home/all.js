const Produtos = require('./../../models/Produto')

module.exports =  {
    async all (req, res) {
        if(req.isAuthenticated()) {
            let produtos = await Produtos.find({ativo: true})
    
            console.log(produtos)
    
            res.render('main/index', { user: req.user.nome, admin: req.user.nivel, produtos: produtos})
        } else {
            Produtos.find({ativo: true}).then((prods) => {
                console.log('prods',prods)
                produtos = prods;
            })
    
            res.render('main/index', {produtos: produtos})
        }
    }

}