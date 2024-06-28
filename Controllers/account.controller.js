
const Account = require('../Models/account.model')
const Role = require('../Models/role.model')
const md5 = require('md5');


// [GET] /api/account
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };

    const records = await Account.find(find).select("-passWord -token");

    const rolesMap = {}; 
    const enrichedRecords = [];

    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        });

        if (role) {
            rolesMap[role._id] = role; 
        }

        enrichedRecords.push({
            ...record.toObject(),
            role: role ? role.toObject() : null
        });
    }

    res.json({
        records: enrichedRecords,
    });
}

module.exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const emailExits = await Account.findOne({
            email : req.body.email,
            deleted : false
        })
    
        if(emailExits){
            res.json({
                code: 200,
                message: "Email đã tồn tại",
            })
            return;
        }
        else{
            req.body.passWord = md5(req.body.passWord)
       
            const record = new Account(req.body)
            await record.save()
    
        }

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
        const emailExits = await Account.findOne({
            _id : {$ne  : req.params.id},
            email : req.body.email,
            deleted : false
        })
    
        if(emailExits){
            res.json({
                code: 200,
                message: "Email đã tồn tại",
            })
            return;
        }
        else{
            if(req.body.passWord){
                req.body.passWord = md5(req.body.passWord)
            }
            else{
                delete req.body.passWord
            }
            await Account.updateOne({_id : req.params.id},req.body)
        }
        res.json({
            code: 200,
            message: "Cập nhật thành công",
            data: data
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
    const record = await Account.findOne({
        _id : id,
        deleted : false
    }).select("-passWord -token");


    res.json(record)
}
