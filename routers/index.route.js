
const productRoute = require('./product.route')
const categoryRoute = require('./category.route')
const roleRoute = require('./role.route')
const systemConfig = "/api"


module.exports = (app) => {
    app.use(systemConfig + '/product', productRoute)
    app.use(systemConfig + '/product-category', categoryRoute)
    app.use(systemConfig + '/roles', roleRoute)
}