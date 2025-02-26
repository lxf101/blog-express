var express = require('express');
var router = express.Router();
var {login} = require('../controller/user');
var {SuccessModel, ErrorModel} = require('../model/resModel')

router.post('/login', function(req, res, next) {
    let {username, password} = req.body;

    let result = login(username, password);
    return result.then(data => {
        if(data.username){
            // set session
            req.session.username = data.username;
            req.session.realname = data.realname;

            res.json(new SuccessModel());
            return;
        }
        res.json(new ErrorModel('login failure'));
    })
});

router.get("/login-test", (req, res, next) => {
    if(req.session.username){
        res.json({
            errno: 0,
            msg: 'logined'
        })
        return;
    }
    res.json({
        errno: -1,
        msg: 'not login'
    })
})

module.exports = router;
