
module.exports = (req, res, next) => {
    if(req.isAuthtnticated()) {
        console.log("Autenticado")
        return next()
    }
    console.log("Não autenticado")
    return res.redirect('/auth')
}