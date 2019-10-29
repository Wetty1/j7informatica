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
    thumbnail: {
        type: String,
        required: true
    }
})

Produto.virtual('thumbnail_url').get(function() {
    return `http://localhost:3000/public/img/thumbnails/${this.thumbnail}`
})

module.exports = mongoose.model('produto', Produto)