const mongoose = require('mongoose')

const Entrada_produto = mongoose.Schema({
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'produto',
        required: true,
    },
    quantidade: {
        type: Number,
        required: true,
    },
    data: {
        type:Date,
        required: true,
        default: Date.now(),
    },
})

module.exports = mongoose.model('entrda_produto', Entrada_produto)