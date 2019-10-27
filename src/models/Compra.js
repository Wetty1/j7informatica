const mongoose = require('mongoose')

const Compra = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('compra', Compra)