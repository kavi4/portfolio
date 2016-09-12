
class Category
{
	get center()   {return this._center;}
	set center(obj)
	{
		this._center = obj;
	}

	constructor(opt)
	{
		this.id     = opt.id;
		this.center = opt.center;
		this.name   = opt.name;
		this.target = null;
		this.image  = opt.image;
		this.filter = opt.filter;
		this.width  = opt.width;
		this.height = opt.height;
		this.active = false;
	}

	render(snap)
	{
		var x = this.center.x - this.width  / 2;
		var y = this.center.y - this.height / 2;
		var targetId = RandID();

		if(snap)
		{
			this.target = snap.image(this.image,x,y,this.width,this.height).attr("transform","s0,"+this.center.x+","+this.center.y);
			this.target.attr({clipPath:this.filter,id:targetId});
			this.show();
		}
		else
		{
			this.target.attr("x",x);
			this.target.attr("y",y);
		}
		
	}

	hide(callback)
	{
		if(callback)
		{
			this.target.animate({transform:"s(0)"},500,mina.elastic(),callback);
		}
		else
		{
			this.target.animate({transform:"s(0)"},500,mina.elastic());
		}
	}

	show(callback)
	{
		if(callback)
		{
			this.target.animate({transform:"s(1)"},500,mina.linear(),callback);
		}
		else
		{
			this.target.animate({transform:"s(1)"},500,mina.linear());
		}
	}

}