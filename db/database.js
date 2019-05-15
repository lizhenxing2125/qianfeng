const mongoose = require('mongoose');

const db_url = 'mongodb://127.0.0.1:27017/shop'
//链接数据库服务器
mongoose.connect(db_url,(err)=>{
    if(err)throw err;
});

module.exports ={
	mongoose
}