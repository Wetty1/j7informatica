const mongoose = require('mongoose')

const Item_carrinho = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'produto',
        required: true
    },
    quantidade: {
        type: Number,
        required:true,
    },
})

module.exports = mongoose.model('item_carrinho', Item_carrinho)