


class CategoryGrid
{
	constructor(opt)
	{
		this.grid         = opt.hexgrid;
		this.categoryes   = [];
		this.catCount     = 0;
		this.snap         = null;
		this.farawayPosX  = 0;
		this.farawayPosY  = 0;
		this.cashRectDots = [];
		this.haveNotPlace = false;
		this.init(opt.data);
	}

	init(data)
	{
		this.catCount      = data.length;
		var dots           = this.getRandomDots();
		var widthAndHeight = this.grid.hexRadius*2;

		for(var i =0; i<this.catCount; i++)
		{
			this.categoryes[i] = new Category({
				id     : data[i].id,
				name   : data[i].name,
				image  : data[i].image,
				width  : widthAndHeight,
				height : widthAndHeight,
				filter : data[i].filter,
				center : dots[i],
			});
		}
	}

	show()
	{
		for(var i=0;i<this.count; i++)
		{
			this.categoryes[i].show();
		}
	}

	hide()
	{
		for(var i=0;i<this.count; i++)
		{
			if(!this.categoryes[i].active)
			{
				this.categoryes[i].hide();
			}
		}
	}

	render(snap)
	{

		if(snap)
		{
			for(var i=0; i<this.categoryes.length; i++)
			{
				this.categoryes[i].render(snap,this.filter);
			}
			this.snap = snap;
			
		}
		else
		{
			this.farawayPosX = 0;
			this.farawayPosY = 0;
			var newDots = this.getRandomDots();
			for(var i =0; i<this.categoryes.length; i++)
			{
				this.categoryes[i].center = newDots[i];
				this.categoryes[i].render();
			}
		}
		
	}

	getRandomDots()
	{
		var dots         = [];
		var numbers      = [];
		var maxNY        = Math.floor( (this.grid.wHeight - this.grid.indentTop)  / this.grid.heightHexRow );
		var maxNXEven    = Math.floor( (this.grid.wWidth  - this.grid.indentLeft) / this.grid.widthHex );
		var maxNXOdd     = Math.floor(this.grid.wWidth / this.grid.widthHex);
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
			
			x-= target.grid.hexRadius;
			y-= target.grid.hexRadius;

			var diam = 2*target.grid.hexRadius;

			if(x + diam > target.farawayPosX){target.farawayPosX = x+diam;}
			if(y + diam > target.farawayPosY){target.farawayPosY = y+diam;}

			return new Dot(x,y);
		}

		function getRectDots(target)//if have not place
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
							dots[number] = new Dot( (j+1)*target.grid.widthHex - target.grid.indentLeft - target.grid.hexRadius, i*target.grid.heightHexRow );
						}else
						{
							dots[number] = new Dot( (j+1)*target.grid.widthHex - target.grid.hexRadius, i*target.grid.heightHexRow);
						}
					}
				}
				return dots;
			}
			
		}
	}
}