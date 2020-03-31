const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const bodyParse = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const hbs = require('express-handlebars')
const methodOverride = require('method-override')
require('dotenv').config()

const app = express()

//METHOD OVERRIDE
app.use(methodOverride('_method'))

//BODY PARSER
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended: false}))

//Pastas estáticas
app.use('/public', express.static(__dirname+'/public'))
app.use('/files', express.static( __dirname+'/uploads' ))

//SESSION
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

require('./src/auth/local')(passport)
//app passport
app.use(passport.initialize())
app.use(passport.session())

//app engine
app.engine('handlebars', hbs())
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'handlebars')

require('./src/auth/middleware')
require('./src/routes')(app, passport)

//mongoose
mongoose.connect(process.env.DB_LINK, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log("Conectado ao banco de dados!")).catch(error => console.log(error))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("http://localhost:"+PORT)
})

   