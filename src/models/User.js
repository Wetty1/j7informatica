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
        type: String,
        required: true,
    }
})

User.methods.genHash = (senha) => {
    return bcrypt.hashSync(senha, bcrypt.genSaltSync(7), null)
}

User.methods.valid = function (senha, cb) {
    return bcrypt.compare(senha, this.senha, cb)
}

module.exports = mongoose.model('user', User)