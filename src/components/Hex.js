class Hex
{
	get center()   {return this._center;}
	set center(obj)
	{
		this._center = obj;
		this.initCoords();
	}

	constructor(dot,radius)
	{
		this.center = dot;
		this.radius = radius;
		this.initCoords();
	}

	render(snap)
	{
		if(snap)
		{
			this.target = snap.polyline(this.coords);
		}
		else
		{
			this.target.attr('points') = this.coords.join(',');
		}
		
	}

	initCoords()
	{
		//подготовленные значения для точек
		var coords = [6.123233995736766e-17, -1, 0.8660254037844386, -0.5, 0.8660254037844387, 0.49999999999999983, 6.123233995736766e-17, 1, -0.8660254037844385, 0.5000000000000003, -0.866025403784439, -0.4999999999999994, -1.8369701987210297e-16, -1];
		for(var i=0; i<coords.length;i+=2)
		{
			coords[i]   = this.center.x + coords[i]   * this.radius;
			coords[i+1] = this.center.y + coords[i+1] * this.radius;
		}
		this.coords = coords;
	}
}