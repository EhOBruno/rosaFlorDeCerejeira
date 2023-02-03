const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');

exports.paginaLogin = (req, res) => {
    res.render('../front/login.html')
}

exports.loginAuth = ('/loginAuth', async (req, res) => {
    console.log("aaa", req.body)
    try {
        let signedUser = await User.findOne({ email: req.body.email })

        if (!signedUser) {
            return res.status(404).send()
        }

        const checkPassword = await bcrypt.compare(req.body.password, signedUser.password)

        if (!checkPassword) {
            return res.status(401).send()
        }
        else {
            return res.status(200)
        }
    }
    catch (err) {
    console.log(err)
    res.status(500).send("err", err).send()
}

})