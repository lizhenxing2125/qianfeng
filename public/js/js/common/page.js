function Page(){
	this.container = $("#sign");
}
Page.prototype ={
	init:function(){
		this.createContent();
	},
	createContent:function(flag){
		if(!flag){
		 	this.register = new Register(this.container);
		}
		else{
			this.Login = new Login(this.container);
		}
	}
}
new Page().init();