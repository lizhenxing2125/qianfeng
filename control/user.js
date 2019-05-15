const userModel=require("../model/user");
//1.引入node核心模块 加密
const crypto = require("crypto");
//引入jsonwebtoken
// const jwt = require("jsonwebtoken");
const utils = require("../utils/token");
const register = (req,res)=> {
	// get接收：req.query
	// post接收：req.body
	let {username,password} = req.body;
	userModel.findUser({username},function(result){
		if(result){
    		res.json({
    			state:false,
    			info:"用户名重复"
    		})
    	}else{
    		//2.创建sha256算法
    		const hash = crypto.createHash("sha256");
    		//3.需要加密的文件
    		hash.update(password);
    		//4.得到加密后的文件
    		userModel.saveUser({username,password:hash.digest("hex")},()=>{
    			res.json({
			   	state:true,
    			info:"注册成功"
			   })
    		})
    	}
	})
}
const login = (req,res)=> {
    // get接收：req.query
    // post接收：req.body
    let {username,password} = req.body;
    userModel.findUser({username},function(result){
        if(result){
            //2.创建sha256算法
            const hash = crypto.createHash("sha256");
            //3.需要加密的文件
            hash.update(password);
            //4.得到加密后的文件
            if(result.password==hash.digest("hex")){

            const token = utils.createToken({user:username},"1901");
            res.cookie("token",token);

            res.json({
                state:true,
                info:"登录成功"
            })
        }else{
                res.json({
                state:false,
                info:"密码错误"
                })
            }
        }else{
            res.json({
                state:false,
                info:"用户不存在"
            })
        }
    })
}

module.exports ={
	register,
    login
}