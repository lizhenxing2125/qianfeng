function Register(container){
	this.container = container;
	this.init();
}

Register.template = `<div class="sign-content">
            <div class="logo">
                <img src="https://cas.1000phone.net/cas/images/login/logo.png">
            </div>
            <form id="register-form">
                <div class="form-group">
                    <label for="sign-register-username">用户名</label>
                    <input type="text" class="form-control" id="sign-register-username" placeholder="请输入用户名">
                </div>
                <div class="form-group">
                    <label for="sign-register-password">密码</label>
                    <input type="password" class="form-control" id="sign-register-password" placeholder="请输入密码">
                </div>
                <p class="bg-info" id="toggle">已注册,立即登录</p>
                <button type="submit" class="btn btn-primary sign-btn"	>注册</button>
            </form>
        </div> `;

 Register.prototype = {
 	init:function(){
 		this.create();
 		this.toggleSign();
 		this.regBtn();
 	},
 	create:function(){
 		this.container.html("");
 		this.el = $("<div></div>");
 		this.el.append(Register.template);
 		this.container.append(this.el);
 	},
 	toggleSign:function(){
 		this.el.find("#toggle").on("click",this.handleToggleSingCb.bind(this));
 	},
 	handleToggleSingCb(){
 		new Page().createContent(true);
 	},
 	regBtn:function(){
 		this.el.find("#register-form").on("submit",this.handleRegBtn.bind(this));
 	},
 	handleRegBtn(e){
 		e.preventDefault();
 		var username = this.el.find("#sign-register-username").val();
 		var password = this.el.find("#sign-register-password").val();
 		$.ajax({
 			type:"post",
 			url:"/users/register",
 			data:{
 				username,
 				password
 			},
 			success:this.handleRegisterSucc.bind(this)
 		})
 	},
 	handleRegisterSucc(data){
 		if(data.state){
            alert("注册成功");
            new Page().createContent(true);
        }else{
            alert("注册失败");
        }
 	}
 }