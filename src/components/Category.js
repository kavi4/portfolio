
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
		this.works  = [];
		this.parent = opt.parent;
		this.active = false;
		this.worksRendered = false;
		this.mainColor = opt.mainColor,
		this.init(opt.data);
	}

	init(data,id)
	{
		var works  = data[this.id].works;
		if(works)
		{
			var count = works.length;
			for(var i = 0;i<count;i++)
			{
				var work = new Work({
					id:works[i].id,
					category:this,
					protoPhoto:works[i].protoPhoto,
					protoWidth:this.width,
					protoHeight:this.height,
					protoFilter:this.filter,
					data:works[i].data,
				});
				this.works.push(work);
			}
		}
	}

	render(snap,callback)
	{
		var x = this.center.x - this.width  / 2;
		var y = this.center.y - this.height / 2;
		var targetId = RandID(this.id);

		if(snap)
		{
			this.target = snap.image(this.image,x,y,this.width,this.height).attr("transform","s0");
			this.target.attr({clipPath:this.filter,id:targetId});
			this.show();
		}
		else
		{
			this.target.attr("x",x);
			this.target.attr("y",y);
		}
		callback?callback():0;
		
	}

	hide(callback)
	{
		if(!this.active)
		{
			callback?this.target.animate({transform:"S(0)"},300,mina.elastic(),callback):this.target.animate({transform:"S(0)"},300,mina.elastic());
		}else
		{
			callback?callback():false;
		}
	}

	show(callback)
	{
		var then = this;
		if(!then.active)
		{
			then.target.animate({transform:"S(0)"},0,mina.elastic(),function(){//обновляем координаты для snap
				callback?then.target.animate({transform:"S(1)"},300,mina.elastic(),callback):then.target.animate({transform:"S(1)"},300,mina.elastic());
			});
		}else
		{
			callback?callback():false;
		}

	}

	renderWorks(snap,callback)
	{
		this.parent.farawayPosY = 0;
		this.parent.farawayPosX = 0;

		var dots = this._getDotsWorks();

		if(snap && !this.worksRendered)
		{
			for(var i =0;i<dots.length;i++)
			{
				this.works[i].center = dots[i];
				this.works[i].renderProto(snap,callback);
			}
			this.worksRendered = true;
		}
		else
		{
			for(var i =0;i<dots.length;i++)
			{
				this.works[i].center = dots[i];
				this.works[i].renderProto(0,callback);
			}
		}
	}

	hideWorks(callback)
	{
		for(var i = 0;i<this.works.length;i++)
		{
			if(i == this.works.length-1)
			{
				callback?this.works[i].protoHide(callback):this.works[i].protoHide();
			}
			else
			{
				this.works[i].protoHide();
			}
			
		}
	}

	showWorks(callback)
	{
		for(var i = 0;i<this.works.length;i++)
		{
			if(i == this.works.length-1)
			{
				callback?this.works[i].protoShow(callback):this.works[i].protoShow();
			}
			else
			{
				this.works[i].protoShow();
			}
		}
	}
	_setFarPos(x,y)
	{
		if(x>this.parent.farawayPosX)this.parent.farawayPosX = x;
		if(y>this.parent.farawayPosY)this.parent.farawayPosY = y;
	}

	_getDotsWorks()
	{
		var grid = this.parent.grid;
		var wWidth = document.documentElement.clientWidth;
		var wHeight = document.documentElement.clientHeight;

		var dots        = [];
		var levels      = 50;
		var minEvenPosX = grid.widthHex*0.8;
		var minOddPosX  = grid.widthHex/5;
		var maxoddPosX  = (Math.floor(wWidth/grid.widthHex))*grid.widthHex;
		var maxEvenPosX = (Math.floor((wWidth - grid.indentLeft)/grid.widthHex))*grid.widthHex;
		var maxPosY     = (Math.floor( (wHeight - grid.indentTop)  / grid.heightHexRow ))*grid.heightHexRow;
		var minPosY     = grid.indentTop;
		var ElemsView   = 0;

		outer:for(var l = 1; l <= levels ;l++)//проходим по уровням
		{
			var angle    = 0;
			var step     = 2*Math.PI/6;
			var ndiam    = l*2;
			var dopElems = l-1;

			for(var i = 0; i < 6 ;i++)//проходим по вершинам
			{
				angle = step*i;

				var x1,y1;
				x1 = this.center.x + grid.widthHex * ndiam/2 * Math.cos(angle);
				y1 = this.center.y + grid.widthHex * ndiam/2 * Math.sin(angle);

				if(addDotIfCan(x1,y1,this)){break outer;}// добавляем вершину
				this._setFarPos(x1+grid.widthHex/2,y1+grid.heightHexRow/2);

				if(dopElems)
				{
					for(var d = 1; d <= dopElems ;d++)//дорисовываем елементы между вершинами если есть
					{
						var x,y;
						var x2 = this.center.x + grid.widthHex * ndiam/2 * Math.cos( step * (i+1) );
						var y2 = this.center.y + grid.widthHex * ndiam/2 * Math.sin( step * (i+1) );
						var diffX  = x1 - x2;
						var diffY  = y1 - y2;
						var shiftX = diffX / ( dopElems+1 );
						var shiftY = diffY / ( dopElems+1 );
						x = x1 - shiftX * d;
						y = y1 - shiftY * d;

						if(addDotIfCan(x,y,this)){break outer;}
						this._setFarPos(x+grid.widthHex/2,y+grid.heightHexRow/2);
					}
				}
				
			}

		}
		return dots;

		function addDotIfCan(x,y,then)
		{
			if(then.parent.haveNotPlace)
			{
				if(ElemsView < then.works.length)
				{
					if(y >= minPosY )
					{
						if(isEvenRow(y))
						{
							if(x >= minEvenPosX )
							{
								addDot(x,y);
							}
						}
						else
						{
							if(x >= minOddPosX )
							{
								addDot(x,y);
							}
						}
					}
				}
				else
				{
					return true;
				}
			}else
			{
				if(ElemsView < then.works.length)
				{
					if(y >= minPosY && y < maxPosY)
					{
						if(isEvenRow(y))
						{
							if(x >= minEvenPosX && x <= maxEvenPosX)
							{
								addDot(x,y);
							}
						}
						else
						{
							if(x >= minOddPosX && x <= maxoddPosX)
							{
								addDot(x,y);
							}
						}
					}
				}
				else
				{
					return true;
				}
			}
		}

		function addDot(x,y)
		{
			dots.push(new Dot(x,y));
			ElemsView++;
		}

		function isEvenRow(y)
		{
			return Math.ceil((y-grid.indentTop)/(grid.heightHexRow))%2==0;
		}
	}

}