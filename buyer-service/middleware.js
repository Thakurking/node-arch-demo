module.exports = async (req, res, next) => {
    // console.log(req.header)
    console.log(req.headers['authorization'])
    req.authHeader = req.headers['authorization']
    next()
}