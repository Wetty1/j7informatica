const mongoose = require('mongoose')

const Item_compra = mongoose.model({
    compra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'compra',
        required: true,
    },
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'produto',
        required: true,
    },
    quantidade: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('item_compra', Item_compra)