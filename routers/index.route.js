
const productRoute = require('./product.route')
const systemConfig = "/api"


module.exports = (app) => {
    app.use(systemConfig + '/product', productRoute)
}