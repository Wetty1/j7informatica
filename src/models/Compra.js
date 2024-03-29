const mongoose = require('mongoose')

const Compra = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    data: {
        type: Date,
        default: Date.now(),
        required: true
    },
    valorTotal: {
        type: Number,
        required:true,
    },
})

module.exports = mongoose.model('compra', Compra)