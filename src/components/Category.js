


class Category
{
	get center()   {return this._center;}
	set center(obj)
	{
		this._center = obj;
	}

	constructor(opt)
	{
		this.id        = opt.id;
		this.center    = opt.center;
		this.name      = opt.name;
		this.target    = null;
		this.image     = opt.image;
		this.filter    = opt.filter;
		this.width     = opt.width;
		this.height    = opt.height;
	}

	render(snap,filter)
	{
		if(snap)
		{
			this.target = snap.image(this.image,this.center.x,this.center.y,this.width,this.height);
			this.target.attr('filter',filter);
		}
		else
		{
			this.target.attr("x",this.center.x);
			this.target.attr("y",this.center.y);
		}
	}
}