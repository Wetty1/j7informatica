const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')
const User = require('./../models/User')

module.exports = (passport) => {
    passport.serializeUser((user, cb) => {
        return cb(null, user._id)
    })
    
    passport.deserializeUser((id, cb) => {
        User.findById(id)
        .then(user => cb(null, user))
        .catch(error => cb(error, {}))
        return cb(null, id)
    })

    passport.use('local-singup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, nome, senha, cb) {
        User.findOne({nome: nome}).then((userExit) => {
            if(!userExit) {
                let user = new User({
                    email: req.body.email,
                    nome: req.body.name,
                    senha: req.body.password
                })
                user.senha = user.genHash(user.senha)

                console.log('Usuario: ', User)

                return user.save()
                .then((userX) => {
                    console.log('Enviado pro banco...')
                    return cb(null, userX)
                })
                .catch(error => {
                    console.error(error)
                    return cb(error)
                })
            }
            return cb(null, false)
        }).catch((error) => {
            return cb(error, false)
        })

    }))

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, cb) {
        User.findOne({username}).then((user) => {
            if(!user){
                console.log('Não encontrado')
                return cb(null, false)
            }
            user.valid(password, (err, result) => {
                if(!result || err) {
                    console.error('erro na senha!')
                    return cb(null, false)
                }
                console.log("logado")
                return cb(null, user)
            })
        })
    }))
}