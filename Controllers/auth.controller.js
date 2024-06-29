const Account = require('../Models/account.model')
const md5 = require("md5")

module.exports.login = async (req, res) => {
    const email = req.body.email
    const passWord = req.body.passWord

    const user = await Account.findOne({
        email: email,
        deleted: false
    })

    if (!user) {
        res.json({
            code: 200,
            message: "Email không tồn tại",
        })
        return
    }

    if (md5(passWord) != user.passWord) {
        res.json({
            code: 200,
            message: "Mât khẩu không chính xác",
        })
        return
    }

    if (user.status == "inactive") {
        res.json({
            code: 200,
            message: "Tài khoản đã bị khóa",
        })
        return
    }

    const token = user.token;
    res.cookie("token", token)
    console.log("ok");
    res.json({
        code: 400,
        message: "Đăng nhập thành công",
        token: token
    })


}

module.exports.detailAcc = async (req, res) => {
    const token = req.cookies.token
    const user = await Account.findOne({ token : token, deleted : false})

    console.log(user);
    res.json(user)
}

module.exports.logout = (req, res) => {
    res.clearCookie("token")

    res.json({
        code: 400,
        message: "Đăng xuất thành công",
    })
}