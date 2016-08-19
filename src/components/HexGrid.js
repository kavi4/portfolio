


class HexGrid
{
	constructor(opt)
	{
		this.hexs         = [];
		this.wWidth       = opt.wWidth;
		this.wHeight      = opt.wHeight;
		this.snap         = null;
		this.nWidth       = 0;
		this.nHeight      = 0;
		this.hexRadius    = opt.hexRadius;
		this.widthHex     = 2*(Math.sqrt(3)/2 * this.hexRadius);
		this.heightHex    = 2*this.hexRadius;
		this.indentTop    = this.heightHex / 4;
		this.indentLeft   = this.widthHex / 2;
		this.heightHexRow = 3/4 * this.heightHex;
		
		this.init();
	}

	init()
	{
		var needNHeight = this.needNHeight();
		var needNWidth  = this.needNWidth();

		this.nWidth  = needNWidth;
		this.nHeight = needNHeight;

		for(var ny = 0; ny < needNHeight; ny++)
		{
			for(var nx = 0; nx < needNWidth; nx++)
			{
				this.addHexInGrid(nx,ny);
			}
		}

	}

	render(snap)
	{
		if(snap)
		{
			for(var i=0; i<this.hexs.length; i++)
			{
				this.hexs[i].render(snap);
			}
			this.snap = snap; 
		}
		else
		{
			var needNHeight = this.needNHeight() + 1;
			var needNWidth  = this.needNWidth()  + 1;

			if(needNWidth > this.nHeight)
			{
				for(var ny = this.nHeight; ny<needNHeight; ny++)
				{
					for(nx=0;nx<this.nWidth;nx++)
					{
						this.addHexInGridWithRender(nx,ny);
					}
				}
				this.nHeight = needNHeight;
			}

			if(needNWidth > this.nWidth)
			{
				for(var ny=0; ny< this.nHeight; ny++)
				{
					for(var nx = this.nWidth;nx<needNWidth; nx++)
					{
						this.addHexInGridWithRender(nx,ny);
					}
				}
				this.nWidth = needNWidth;
			}
		}
	}

	needNHeight()
	{
		return Math.ceil((this.wHeight + this.heightHex - this.indentTop)  / this.heightHexRow);
	}

	needNWidth()
	{
		return Math.ceil((this.wWidth  + this.indentLeft) / this.widthHex);
	}

	addHexInGridWithRender(nx,ny)
	{
		if(ny%2 == 0)
		{
			var hex = new Hex(this.getDotEvenRow(nx,ny),this.hexRadius);
			hex.render(this.snap);
			this.hexs.push(hex);
		}
		else
		{
			var hex = new Hex(this.getDotOddRow(nx,ny),this.hexRadius);
			hex.render(this.snap);
			this.hexs.push(hex);
		}
	}
	
	addHexInGrid(nx,ny)
	{
		if(ny%2 == 0)
		{
			this.hexs.push(new Hex(this.getDotEvenRow(nx,ny),this.hexRadius));
		}
		else
		{
			this.hexs.push(new Hex(this.getDotOddRow(nx,ny),this.hexRadius));
		}
	}

	getDotEvenRow(nx,ny)
	{
		return new Dot(nx*this.widthHex , ny*this.heightHexRow - this.indentTop);
	}

	getDotOddRow(nx,ny)
	{
		return new Dot(nx*this.widthHex + this.indentLeft , ny*this.heightHexRow - this.indentTop);
	}
}