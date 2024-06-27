
const productCategory = require("../Models/category.model")
const searchHelper = require("../helper/search.helper")
// [GET] /admin/product-category
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    // Status
    if(req.query.status){
        find.status = req.query.status
    }

    // Search
    const objectSearch = searchHelper(req.query)

    if (objectSearch.regex) {
        find.name = objectSearch.regex
    }

    // Sort
    const Sort = {

    }

    if(req.query.sortKey && req.query.sortValue){
        Sort[req.query.sortKey] = req.query.sortValue
    }else{
        Sort.position = "desc"
    }

    const products = await productCategory.find(find).sort(Sort)

    res.json(products)
}

//[GET] /admin/product-category/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id
        const status = req.body.status

        await productCategory.updateOne({
            _id: id
        }, {
            status: status
        })

        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại"
        })
    }

}

// [GET] /admin/product-category/delete/:id
module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id

        console.log(id);
        await productCategory.updateOne({
            _id: id
        }, {
            deleted: true,
        })

        res.json({
            code: 200,
            message: "Xóa thành công! ",
        })

    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi"
        })
    }
}
