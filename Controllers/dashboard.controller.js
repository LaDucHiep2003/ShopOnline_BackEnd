
const productCategory = require("../Models/category.model")
const Product = require("../Models/product.model")
const Account = require("../Models/account.model")
// const User = require("../../models/user.model")

// [GET] /admin/dashboard
module.exports.index = async (req, res) => {
    const statistic = {
        categoryProduct : {
            total : 0,
            active : 0,
            inactive : 0
        },
        product : {
            total : 0,
            active : 0,
            inactive : 0
        },
        account : {
            total : 0,
            active : 0,
            inactive : 0
        },
        user : {
            total : 0,
            active : 0,
            inactive : 0
        }
    }

    // Category

    statistic.categoryProduct.total = await productCategory.countDocuments({
        deleted : false
    })
    statistic.categoryProduct.active = await productCategory.countDocuments({
        deleted : false,
        status : "active"
    })
    statistic.categoryProduct.inactive = await productCategory.countDocuments({
        deleted : false,
        status : "inactive"
    })

    // Product

    statistic.product.total = await Product.countDocuments({
        deleted : false
    })
    statistic.product.active = await Product.countDocuments({
        deleted : false,
        status : "active"
    })
    statistic.product.inactive = await Product.countDocuments({
        deleted : false,
        status : "inactive"
    })

    // Account

    statistic.account.total = await Account.countDocuments({
        deleted : false
    })
    statistic.account.active = await Account.countDocuments({
        deleted : false,
        status : "active"
    })
    statistic.account.inactive = await Account.countDocuments({
        deleted : false,
        status : "inactive"
    })

    // // User

    // statistic.user.total = await User.countDocuments({
    //     deleted : false
    // })
    // statistic.user.active = await User.countDocuments({
    //     deleted : false,
    //     status : "active"
    // })
    // statistic.user.inactive = await User.countDocuments({
    //     deleted : false,
    //     status : "inactive"
    // })

    res.json(statistic)
}