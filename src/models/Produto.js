const mongoose = require('mongoose')

const Produto = mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    decricao:{
        type: String,
        required: true
    },
    preco:{
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('produto', Produto)