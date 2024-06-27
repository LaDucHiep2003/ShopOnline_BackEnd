
const Product = require('../Models/product.model')
const searchHelper = require("../helper/search.helper")
const paginationHelper = require("../helper/pagination.helper")

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
        find.title = objectSearch.regex
    }

    // Sort
    const Sort = {

    }

    if(req.query.sortKey && req.query.sortValue){
        Sort[req.query.sortKey] = req.query.sortValue
    }else{
        Sort.position = "desc"
    }

    // Pagination
    const countTasks = await Product.countDocuments(find)

    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 5
        },
        req.query,
        countTasks
    )
    
    const record = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip).sort(Sort)

    res.json(record)
}

// Change Status
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id
        const status = req.body.status

        await Product.updateOne({
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
// End Change Status

// Delete
module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id

        console.log(id);
        await Product.updateOne({
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

// End Delete

module.exports.create = async (req, res) => {
    try {
        if(req.body.position){
            req.body.position = parseInt(req.body.position)
        }
        else{
            const count = await Product.countDocuments()
            req.body.position = count + 1
        }

        console.log(req.body);
        const product = new Product(req.body)
        const data = await product.save()

        res.json({
            code: 200,
            message: "Tạo thành công",
            data: data
        })

    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi"
        })
    }
}

// [PATCH] /api/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id

        await Product.updateOne({
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

// [GET] /api/product/detail/:id
module.exports.detail = async (req, res) => {
    const productId = req.params.id
    const product = await Product.findOne({
        _id : productId,
        deleted : false
    })
    res.json(product)
}