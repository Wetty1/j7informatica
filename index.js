const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const bodyParse = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const hbs = require('express-handlebars')

const app = express()

//BODY PARSER
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended: false}))
app.use('/public', express.static(__dirname+'/public'))
app.use('/upload', express.static(__dirname+'/upload' ))

//SESSION
app.use(session({
    secret: '!@$#%@@#asd',
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
mongoose.connect('mongodb+srv://user:user@cluster0-0v0b4.mongodb.net/j7info?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log("deu bom")).catch(error => console.log(error))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("http://localhost:"+PORT)
})

   