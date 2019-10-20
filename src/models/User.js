const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
require('mongoose-type-email')

const User = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
    senha: {
        
    }
})

module.exports = mongoose.model('user', User)