//isAdmin

module.exports = (app, passport) => {
    app.use('/', require('./controllers/home/index'))
    app.use('/compra', require('./controllers/compra/index'))
    app.use('/user', require('./controllers/user/index')(passport))
    app.use('/admin', require('./controllers/admin/index'))
}