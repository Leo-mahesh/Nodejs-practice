
const middleware = (req, res, next) => {

    // Middleware Logic
    console.log("Middleware Loaded")

    // Passing Cursor to next Middleware
    next()
}

module.exports = middleware