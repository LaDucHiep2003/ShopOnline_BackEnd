
const productCategory = require("../Models/category.model")
const searchHelper = require("../helper/search.helper")
// [GET] /admin/product-category
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    // Status
    if (req.query.status) {
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

    if (req.query.sortKey && req.query.sortValue) {
        Sort[req.query.sortKey] = req.query.sortValue
    } else {
        Sort.position = "desc"
    }

    const products = await productCategory.find(find).sort(Sort)

    res.json(products)
}

//[PATCH] /admin/product-category/change-status/:id
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

// [PATCH] /admin/product-category/delete/:id
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

// [POST] /admin/product-category/create
module.exports.create = async (req, res) => {
    try {
        console.log(req.body);

        if (req.body.position) {
            req.body.position = parseInt(req.body.position)
        } else {
            const countProducts = await productCategory.countDocuments()
            req.body.position = countProducts + 1
        }

        const record = new productCategory(req.body)
        await record.save()

        res.json({
            code: 200,
            message: "Tạo thành công! ",
        })

    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi"
        })
    }
}

// [PATCH] /api/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id

        await productCategory.updateOne({
            _id: id
        }, req.body)

        res.json({
            code: 200,
            message: "Cập nhật thành công! ",
        })

    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi"
        })
    }
}

// [GET] /api/product-category/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id
    const product = await productCategory.findOne({
        _id : id,
        deleted : false
    })
    res.json(product)
}
