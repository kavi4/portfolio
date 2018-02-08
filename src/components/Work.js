
class Work
{
	get protoCenter()   {return this._center;}
	set protoCenter(obj)
	{
		this._center = obj;
	}

	constructor(opt)
	{
		this.id          = opt.id;
		this.category      = opt.category;
		this.protoTarget = null;
		this.protoPhoto  = opt.protoPhoto;
		this.protoWidth  = opt.protoWidth;
		this.protoHeight = opt.protoHeight;
		this.protoCenter = opt.protoCenter;
		this.protoFilter = opt.protoFilter;
		this.data        = opt.data;

	}

	renderProto(snap,callback)
	{
		var x = this.center.x - this.protoWidth  / 2;
		var y = this.center.y - this.protoHeight / 2;
		var protoTargetId = RandID(this.id+"-"+this.category.id);

		if(snap)
		{
			this.protoTarget = snap.image(this.protoPhoto,x,y,this.protoWidth,this.protoHeight).attr("transform","S0");
			this.protoTarget.attr({clipPath:this.protoFilter,id:protoTargetId});
		}
		else
		{
			this.protoTarget.attr("x",x);
			this.protoTarget.attr("y",y);
		}
		callback?callback():false;
	}

	protoHide(callback)
	{
		callback?this.protoTarget.animate({transform:"s(0)"},300,mina.elastic(),callback):this.protoTarget.animate({transform:"s(0)"},300,mina.elastic());
	}

	protoShow(callback)
	{
		var then = this;
		then.protoTarget.animate({transform:"s(0)"},0,mina.elastic(),function(){
			callback?then.protoTarget.animate({transform:"s(1)"},300,mina.elastic(),callback):then.protoTarget.animate({transform:"s1)"},300,mina.elastic());
		})
		

	}

	showWork(img)
	{
		img.attr({transform:"S(1)"});
	}

	hideWork(img)
	{
		img.attr({transform:"S(0)"});
	}
}