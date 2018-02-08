


class CategoryGrid
{
	get haveNotPlace()   {return this._haveNotPlace;}
	set haveNotPlace(value)
	{
		this._haveNotPlace = value;
		this.onhaveNotPlaceChanged(value);
	}

	constructor(opt)
	{
		this.grid         = opt.hexgrid;
		this.categoryes   = [];
		this.catCount     = 0;
		this.target       = null;
		this.farawayPosX  = 0;
		this.farawayPosY  = 0;
		this.cashRectDots = [];
		this.onhaveNotPlaceChanged = function(){};
		this.haveNotPlace = false;
		this.init(opt.data);
	}

	init(data)
	{
		this.catCount      = data.length;
		var widthAndHeight = this.grid.hexRadius*2;

		for(var i =0; i<this.catCount; i++)
		{
			this.categoryes[i] = new Category({
				id       : data[i].id,
				name     : data[i].name,
				image    : data[i].image,
				width    : widthAndHeight,
				height   : widthAndHeight,
				filter   : data[i].filter,
				parent   : this,
				data     : data,
				mainColor: data[i].mainColor,
			});
		}
	}

	show(callback)
	{
		this.farawayPosY = 0;
		this.farawayPosX = 0;

		for(var i=0;i<this.catCount; i++)
		{
			var category = this.categoryes[i];
			if(i == this.catCount-1)
			{
				callback?category.show(callback):category.show();
			}
			else
			{
				category.show();
			}
			if(category.center.x+this.grid.widthHex/2>this.farawayPosX){this.farawayPosX = category.center.x+this.grid.widthHex/2}
			if(category.center.y+this.grid.heightHexRow/2>this.farawayPosY){this.farawayPosY = category.center.y+this.grid.heightHexRow/2}
		}
	}

	hide(callback)
	{
		for(var i=0;i<this.catCount; i++)
		{
			if(i == this.catCount-1)
			{
				callback?this.categoryes[i].hide(callback):this.categoryes[i].hide();
			}
			else
			{
				this.categoryes[i].hide();
			}
		}
	}

	render(snap,callback)
	{
		if(snap)
		{
			var dots = this.getDots();
			for(var i=0; i<this.categoryes.length; i++)
			{
				this.categoryes[i].center = dots[i];
				this.categoryes[i].render(snap);
			}
			this.target = snap;
			
		}
		else
		{
			this.farawayPosX = 0;
			this.farawayPosY = 0;
			var newDots = this.getDots();
			for(var i =0; i<this.categoryes.length; i++)
			{
				if(i == this.categoryes.length-1)
				{
					this.categoryes[i].center = newDots[i];
					callback?this.categoryes[i].render(0,callback):this.categoryes[i].render();
				}
				else
				{
					this.categoryes[i].center = newDots[i];
					this.categoryes[i].render();
				}
			}
		}
	}

	disableAll()
	{
		var active = false;
		for(var i =0;i<this.categoryes.length;i++)
		{
			if(this.categoryes[i].active)
			{
				active = this.categoryes[i];
				this.categoryes[i].hideWorks();
				this.categoryes[i].active = false;
			}
		}
		return active;
	}

	getDots()
	{
		var dots         = [];
		var numbers      = [];
		var maxNY        = Math.floor( (this.grid.wHeight - this.grid.indentTop)  / this.grid.heightHexRow )-1;
		var maxNXEven    = Math.floor( (this.grid.wWidth  - this.grid.indentLeft) / this.grid.widthHex )-1;
		var maxNXOdd     = Math.floor(this.grid.wWidth / this.grid.widthHex)-1;
		var sizedublerow = maxNXEven + maxNXOdd;
		var countPlaces  = Math.floor(maxNY/2) * (maxNXEven +  maxNXOdd);

		if(maxNY%2 != 0)
		{
			countPlaces+= maxNXOdd;
		}

		if(countPlaces <= this.catCount)
		{
			this.haveNotPlace = true;
			dots = getRectDots(this);
		}
		else
		{
			this.haveNotPlace = false;
			for(var i=0; i<this.catCount; i++)
			{
				dots[i] = getDot(this);
			}
		}
		return dots;

	
		function getDot(target)
		{
			var dotNumber = Math.floor(Math.random() * countPlaces);
			if(dotNumber==0){dotNumber=1}
			var isset = false;

			for(var i=0; i<numbers.length; i++)
			{
				if(numbers[i] == dotNumber){isset=true;}
			}

			if(isset)
			{
				return getDot(target);
			}
			else
			{
				numbers.push(dotNumber);
				return getDotFromPosition(dotNumber,target);
			}
		}

		function getDotFromPosition(dotNumber,target)
		{
			var x,y;
			var out = dotNumber % sizedublerow;
			var pos = out - maxNXOdd;
			var dublerows = Math.floor(dotNumber/sizedublerow)*2;

			if(pos > 0)//не четная
			{
				x = pos * target.grid.widthHex;
				y = (dublerows + 2) * target.grid.heightHexRow - target.grid.indentTop;

			}

			if(pos <= 0)//четная
			{
				x = out * target.grid.widthHex - target.grid.indentLeft;
				y = (dublerows + 1) * target.grid.heightHexRow - target.grid.indentTop;
			}

			if(out == 0)
			{
				x = maxNXEven * target.grid.widthHex;
				y = dotNumber / sizedublerow * 2*target.grid.heightHexRow - target.grid.indentTop;
			}

			var thisFarPosX = x + target.grid.hexRadius;
			var thisFarPosY = y + target.grid.hexRadius;
			if(thisFarPosX > target.farawayPosX){target.farawayPosX = thisFarPosX;}
			if(thisFarPosY > target.farawayPosY){target.farawayPosY = thisFarPosY;}

			return new Dot(x,y);
		}

		function getRectDots(target)//если нехватает места
		{
			if(target.cashRectDots[0])
			{
				return target.cashRectDots;
			}
			else
			{
				var dots = [];
				var edge = Math.ceil(Math.sqrt(target.catCount));

				for(var i =0; i<edge; i++)
				{
					for(var j =0; j<edge; j++)
					{
						var number = i * edge + j;
						target.grid.render(0,edge+2,edge+2);//дорисовываем сетку для недостающих элементов

						if(i%2==0)
						{
							dots[number] = new Dot( 
								(j+1)*target.grid.widthHex - target.grid.indentLeft,
								i*target.grid.heightHexRow + target.grid.heightHexRow - target.grid.indentTop);
						}else
						{
							dots[number] = new Dot( 
								(j+1)*target.grid.widthHex ,
								i*target.grid.heightHexRow + target.grid.heightHexRow - target.grid.indentTop);
						}
					}
				}
				return dots;
			}
		}

	}
}