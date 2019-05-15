function Login(container){
	this.container = container;
	this.init();
}

Login.template = `<div class="sign-content">
            <div class="logo">
                <img src="https://cas.1000phone.net/cas/images/login/logo.png">
            </div>
            <form id="login-form">
                <div class="form-group">
                    <label for="sign-login-username">用户名</label>
                    <input type="text" class="form-control" id="sign-login-username" placeholder="请输入用户名">
                </div>
                <div class="form-group">
                    <label for="sign-login-password">密码</label>
                    <input type="password" class="form-control" id="sign-login-password" placeholder="请输入密码">
                </div>
                <p class="bg-info" id="toggle">立即注册</p>
                <button type="submit" class="btn btn-primary sign-btn">登录</button>
            </form>
        </div> `;

Login.prototype = {
 	init:function(){
 		this.create();
 		this.toggleSign();
        this.loginBtn();
 	},
 	create:function(){
 		this.container.html("");
 		this.el = $("<div></div>");
 		this.el.append(Login.template);
 		this.container.append(this.el);
 	},
 	toggleSign:function(){
 		this.el.find("#toggle").on("click",this.handleToggleSingCb.bind(this));
 	},
 	handleToggleSingCb(){
 		new Page().createContent(false);
 	},
    loginBtn:function(){
        this.el.find("#login-form").on("submit",this.handleLoginBtn.bind(this));
    },
    handleLoginBtn(e){
        e.preventDefault();
        var username = this.el.find("#sign-login-username").val();
        var password = this.el.find("#sign-login-password").val();
        $.ajax({
            type:"post",
            url:"/users/login",
            data:{
                username,
                password
            },
            success:this.handleLoginSucc.bind(this)
        })
    },
    handleLoginSucc(data){
        if(data.state){
            alert(data.info);
            location.href="http://localhost:3000/html/home.html";
        }else{
            alert(data.info);
        }
    }
 }