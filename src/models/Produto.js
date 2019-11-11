const mongoose = require('mongoose')

const Produto = mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    valor:{
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    thumbnail2: {
        type: String,
        required: true
    },
    thumbnail3: {
        type: String,
        required: true
    },
    thumbnail4: {
        type: String,
        required: true
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true,
    }
})

Produto.virtual('thumbnail_url').get(function() {
    return `http://localhost:3000/files/${this.thumbnail}`
})

module.exports = mongoose.model('produto', Produto)