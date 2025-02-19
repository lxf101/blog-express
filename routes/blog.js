var express = require('express');
var router = express.Router();
const {getList, newBlog, updateBlog, deleteBlog, getDetail} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', (req, res, next) => {
    let author = req.query.author || '';
    let keyword = req.query.keyword || '';

    if(req.query.isadmin){
        if(req.session.username == null){
            // not login
            res.json(new ErrorModel('not login'))
            return 
        }
        // force to search self blog
        author = req.session.username;
    }
    
    const result = getList(author, keyword);
    return result.then(listData => {
        res.json(new SuccessModel(listData))
    });
});

router.get('/detail', (req, res, next) => {
    const result = getDetail(req.query.id);
    return result.then(data => {
        res.json(new SuccessModel(data));
    })
});



module.exports = router;
