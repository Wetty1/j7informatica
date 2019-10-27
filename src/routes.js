module.exports = (app, passport) => {
    app.use('/', require('./controllers/home/index'))
    // app.use('/seach', require('./controllers/busca/index'))
    app.use('/user', require('./controllers/user/index')(passport))
    app.use('/admin', require('./controllers/admin/index')(passport))
}