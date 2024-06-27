
const Role = require("../Models/role.model")
// 
module.exports.index = async (req, res) => {

    let find = {
        deleted : false
    }

    const records = await Role.find(find)
    res.json(records)
}

module.exports.create = async (req, res) => {
    try {
        
        const roles = new Role(req.body)
        const data = await roles.save()

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

module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id

        await Role.updateOne({
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

module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id

        await Role.updateOne({
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

module.exports.detail = async (req, res) => {
    const id = req.params.id
    const record = await Role.findOne({
        _id : id,
        deleted : false
    })
    res.json(record)
}