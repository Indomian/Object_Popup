__PU={
	pu:null,
	cls:null,
	cnt:null,
	sh:null,
	bd:null,
	create:function(w,h){
		if(!this.isset()){
			var body=$("body");
			var self=this;
			var pu_out=this.createElm("div",{'class':"pu_out"});
			var pu_in=this.createElm("div",{'class':"pu_in"});
			var pu_cnt=this.createElm("div",{'class':"pu_cnt"});
			var pu_cls=this.createElm("a",{'class':"pu_cls",'href':'javascript:void'}).html('x');
			var pu_sh=this.createElm('div',{'class':'pu_sh'});
			this.cnt=pu_cnt;
			this.cls=pu_cls;
			this.pu=pu_out;
			this.sh=pu_sh;
			this.bd=body;
			pu_out.append(pu_in);
			pu_out.append(pu_cls);
			pu_in.append(pu_cnt);
			body.append(pu_out).append(pu_sh);
			if(w)pu_out.width(w);
			if(h)pu_out.height(h);
			this.sh.height(body.height());
			this.cls.click(function(){self.hide()});
			this.sh.click(function(){self.hide()});
		}else{
			this.resize(w,h);
		}
	},
	addClass:function(className){
		$(this.pu).addClass(className);
	},
	removeClass:function(className){
		$(this.pu).removeClass(className);
	},
	resize:function(w,h){
		if(!this.isset() || !w || !h) return false;
		this.pu.width(w).height(h);
	},
	isset:function(){
		if(!this.pu)return false;
		else return true;
	},
	show:function(x,y){
		this.evDoShow();
		if(!this.pu || !this.cls) return false;
		if(x && y)
			this.pu.css({'left':x+"px",'top':y+"px"});
		else
			this.center();
		var self = this;
		this.sh.fadeIn(100,function(){
			var callFunc = self.evAfterShow;
			self.pu.stop().fadeIn(100, callFunc);
		})
	},
	hide:function(){
		this.evDoHide();
		if(!this.pu) return false;
		var self=this;
		this.pu.stop().fadeOut(100,function(){
			self.sh.fadeOut(100);
		});
	},
	center:function(t){
		var wnd=$(window);
		var self=this;
		this.size();
		if(!t){
			this.pu.css({left:"50%",marginLeft: "-"+(this.w/2)+"px"});
			$(window).scroll(function(){
				self.center(true);
			})
		}
		this.pu.css({top:wnd.height()/2+wnd.scrollTop()+"px",marginTop:"-"+(this.h/2) + "px"})
	},
	set:function(c){
		this.cnt.empty();
		if(typeof c=="string")
			this.cnt.html(c);
		else if( typeof c=="object")
			this.cnt.append(c);
	},
	get:function(){
		return this.cnt.html();
	},
	size:function(){
		var sz={'w':0,'h':0};
		if(this.pu){
			this.h=this.pu.height();
			this.w=this.pu.width();
			sz.w=this.w;
			sz.h=this.h;
		}
		return sz;
	},
	hasCnt:function(){
		var cnt=this.get();
		return (cnt!='')?true:false;
	},
	cntElm:function(){
		return $(this.cnt);
	},
	createElm:function(elm,attrs){
		if(!elm || elm=="") return false;
		var elm=$(document.createElement(elm));
		if(attrs && typeof attrs=="object")
			elm.attr(attrs);
		return elm;
	},
	evAfterShow:function(){},
	evDoShow:function(){},
	evDoHide:function(){}
}