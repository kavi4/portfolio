
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
		this.protoTarget = null;
		this.protoPhoto  = opt.photo;
		this.protoWidth  = opt.width;
		this.protoHeight = opt.height;
		this.protoCenter = opt.center;
		this.protoFilter = opt.filter;

	}

	renderProto(snap)
	{
		var x = this.center.x - this.protoWidth  / 2;
		var y = this.center.y - this.protoHeight / 2;
		var protoTargetId = RandID();

		if(snap)
		{
			this.protoTarget = snap.image(this.protoPhoto,x,.y,this.protoWidth,this.protoHeight).attr("transform","s0");
			this.protoTarget.attr({clipPath:this.filter,id:protoTargetId});
		}
		else
		{
			this.protoTarget.attr("x",x);
			this.protoTarget.attr("y",y);
		}
	}

	protoHide(callback)
	{
		if(callback)
		{
			this.protoTarget.animate({transform:"s(0)"},500,mina.elastic(),callback);
		}
		else
		{
			this.protoTarget.animate({transform:"s(0)"},500,mina.elastic());
		}
	}

	protoShow(callback)
	{
		if(callback)
		{
			this.protoTarget.animate({transform:"s(1)"},500,mina.linear(),callback);
		}
		else
		{
			this.protoTarget.animate({transform:"s(1)"},500,mina.linear());
		}
	}
}