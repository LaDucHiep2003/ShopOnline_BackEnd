
const productCategory = require("../Models/category.model")
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    const products = await productCategory.find(find)

    res.json(products)
}