
const Product = require('../Models/product.model')

module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const record = await Product.find(find)

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

        req.body.price = parseInt(req.body.price)
        req.body.discountPercentage = parseInt(req.body.discountPercentage)
        req.body.stock = parseInt(req.body.stock)
        req.body.position = parseInt(req.body.position)

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