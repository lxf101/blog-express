const crypto = require('crypto');

const SECRET_KEY = 'Dasae&87932#dafd0dj$asDKA#';

// MD5
function md5(content){
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

function generatePassword(password){
    let str = `password=${password}&key=${SECRET_KEY}`;
    return md5(str);
}

module.exports = {
    generatePassword
}