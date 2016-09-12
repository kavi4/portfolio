
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
		this.works  = opt.works;
		this.parent = opt.parent;
		this.active = false;
		this.worksRendered = false;
	}

	render(snap)
	{
		var x = this.center.x - this.width  / 2;
		var y = this.center.y - this.height / 2;
		var targetId = RandID();

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

	renderWorks(snap)
	{
		if(snap && !worksRendered)
		{

		}
		else
		{

		}
	}

	hideWorks()
	{

	}

	showWorks()
	{

	}

	_getDotsWorks(n)
	{
		var grid = this.parent.grid;
		var dots        = [];
		var levels      = 50;
		var minEvenPosX = grid.widthHex/3;
		var minOddPosX  = grid.widthHex*0.9;
		var minPosY     = -grid.indentTop;
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

				if(addDotIfCan(x1,y1)){break outer;}// добавляем вершину
			
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

						if(addDotIfCan(x,y)){break outer;}
					}
				}
				
			}

		}
		return dots;

		function addDotIfCan(x,y)
		{
			if(ElemsView < n)
			{
				if(y >= minPosY)
				{
					if(isEvenRow(y))
					{
						if(x >= minOddPosX)
						{
							addDot(x,y);
						}
					}
					else
					{
						if(x >= minEvenPosX )
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