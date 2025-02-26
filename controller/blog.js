const xss = require('xss');
const {exec} = require('../db/mysql');

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if(author){
        sql += `and author='${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // return a promise
    return exec(sql);
}

// create new blog
const newBlog = (blogData = {}) => {
    let {content, title, author} = blogData;
    content = xss(content);
    title = xss(title);
    let createTime = Date.now();

    let sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${createTime}', '${author}')`;
    return exec(sql).then(data => {
        return {
            id: data.insertId
        }
    });
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`;
    return exec(sql).then(data => {
        return data[0];
    })
}


// update a blog
const updateBlog = (id, blogData = {}) => {
    let {content, title} = blogData;
    content = xss(content);
    title = xss(title);

    let sql = `update blogs set content='${content}', title='${title}' where id=${id}`;
    return exec(sql).then(data => {
        if(data.affectedRows > 0){
            return true;
        }
        return false;
    });
}

// delete a blog
const deleteBlog = (id, author) => {
    let sql = `delete from blogs where id=${id} and author='${author}'`;
    return exec(sql).then(data => {
        if(data.affectedRows > 0){
            return true;
        }
        return false;
    });
}

module.exports = {
    getList,
    newBlog,
    updateBlog,
    deleteBlog,
    getDetail
}