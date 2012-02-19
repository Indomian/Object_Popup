__PU={
	pu:null,
	cls:null,
	cnt:null,
	sh:null,
	bd:null,
	cm:{},
	create:function(w,h){
		if(!this.isset()){
			var body=$("body");
			var self=this;
			var pu_out=this.createElm("div",{'class':"pu_out"});
			var pu_in=this.createElm("div",{'class':"pu_in"});
			var pu_cnt=this.createElm("div",{'class':"pu_cnt"});
			var pu_cls=this.createElm("a",{'class':"pu_cls",'href':'#'}).html('x');
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
			this.sh.height($(document).height());
			this.cls.click(function(){self.hide()});
			this.sh.click(function(){self.hide()});
		}else{
			this.resize(w,h);
		}
	},
	addClass:function(className){
		this.pu.addClass(className);
	},
	removeClass:function(className){
		this.pu.removeClass(className);
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
		this._resizeShadow();
	},
	hide:function(){
		this.evDoHide();
		if(!this.pu) return false;
		var self=this;
		this.pu.stop().fadeOut(100,function(){
			self.sh.fadeOut(100,function(){self.evAfterHide()});
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
		var top=wnd.height()/2+wnd.scrollTop();
		if(top-(this.h/2)<0)
			top=this.h/2;
		this.pu.css({'top':top+"px",marginTop:"-"+(this.h/2) + "px"})
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
			this.h=this.pu.height()+parseInt(this.pu.css('padding-top'))+parseInt(this.pu.css('padding-bottom'));
			this.w=this.pu.width()+parseInt(this.pu.css('padding-left'))+parseInt(this.pu.css('padding-right'));
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
	alert:function(m){
		this._createConfirm();
		this.cm.cancel.hide();
		this.cm.ok.addClass('cm_alert_ok');
		this.confirm(m);
		this.evAfterHide=function(){
			this.cm.cancel.show();
			this.cm.ok.removeClass('cm_alert_ok');
		}
	},
	confirm:function(m){
		this.create(315);
		this._createConfirm();
		this.cm.content.html(m);
		var self=this;
		this.cm.ok.unbind('click').click(function(){
			if('positive' in self.cm)
				self.cm.positive();
			self.hide();
		})
		this.cm.cancel.unbind('click').click(function(){
			if('negative' in self.cm)
				self.cm.negative();
			self.hide();
		})
		this.set(this.cm.out.clone(true));
		this.show();
	},
	confirmResult:function(p,n){
		if(p && typeof p=='function') this.cm.positive=p;
		if(n && typeof n=='function') this.cm.negative=n;
	},
	_createConfirm:function(){
		if(!('out' in this.cm)){
			var self=this;
			this.cm.out=this.createElm('div',{'class':'cm_out'})
			this.cm.content=this.createElm('div',{'class':'cm_content'})
			this.cm.but=this.createElm('div',{'class':'cm_buttons'});
			this.cm.ok=this.createElm('a',{'href':'#','class':'submit'}).html('Принять');
			this.cm.cancel=this.cm.ok.clone(true).html('Отмена');
			this.cm.but.append(this.cm.ok).append(this.cm.cancel);
			this.cm.out.append(this.cm.content).append(this.cm.but);
		}
	},
	_resizeShadow:function(e){
		__PU.sh.height($(document).height());
		__PU.center();
	},
	evAfterShow:function(){},
	evAfterHide:function(){
		$(window).unbind('resize',__PU._resizeShadow);
	},
	evDoShow:function(){
		$(window).resize(__PU._resizeShadow);
	},
	evDoHide:function(){}
}