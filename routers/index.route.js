
const productRoute = require('./product.route')
const categoryRoute = require('./category.route')
const roleRoute = require('./role.route')
const accountRoute = require('./account.route')
const authRoute = require("./auth.route")
const dashboardRoute = require("./dashboard.route")

const systemConfig = "/api"


module.exports = (app) => {
    app.use(systemConfig + '/product', productRoute)
    app.use(systemConfig + '/product-category', categoryRoute)
    app.use(systemConfig + '/roles', roleRoute)
    app.use(systemConfig + '/accounts', accountRoute)
    app.use(systemConfig + '/auth', authRoute)
    app.use(systemConfig + '/dashboard', dashboardRoute)
}