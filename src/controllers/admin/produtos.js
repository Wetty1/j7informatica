const Produtos = require('./../../models/Produto')

module.exports = async function (req, res) { 
    const produtos = await Produtos.find()
    
}