
class Controll
{
	constructor(opt)
	{
		this.id               = RandID(opt.id);
		this.center           = null;
		this.target           = null;
		this.category         = opt.category;
		this.activeWork       = null;
		this.viewElement      = null;
		this.viewShowed       = false;
		this.controllShowed   = false;
		this.animationFinish  = true;
		this.firstBtn         = null;
		this.secondBtn        = null;
		this.thirdBtn         = null;
		this._points1         = null;
		this._points2         = null;
		this._points3         = null;
		this.bodyGroup        = opt.body;
		this.viewContainer    = opt.viewContainer;
		this.workTarget       = null;
		this.newxtWorkTarget  = null;

		this.init(opt.viewContainer,opt.container);
	}

	init(viewContainer,container)
	{
		this.viewElement = viewContainer.polyline().attr("id","viewElement");
		this.firstBtn    = container.polyline().attr("id","firstBtnController").attr({style:"fill:black"});
		this.secondBtn   = container.polyline().attr("id","secondBtnController").attr({style:"fill:green"});
		this.thirdBtn    = container.polyline().attr("id","thirdBtnController").attr({style:"fill:black"});

		this.workTarget      = viewContainer.image();
		this.newxtWorkTarget = viewContainer.image();
	}

	showControll(dot2)
	{
		if(!this.animationFinish){return false;}
		this.animationFinish = false;
		var dot1 = {x:dot2.x - this.activeWork.category.parent.grid.widthHex,y:dot2.y};
		var dot3 = {x:dot2.x + this.activeWork.category.parent.grid.widthHex,y:dot2.y};

		var tmp       = Object.assign({},this.activeWork);
		tmp.center    = dot1;
		var points1   = this._initSecondCoords(tmp);
		this._points1 = this._initFirstCoords(tmp);
		this.firstBtn.attr({points:this._points1});

		tmp.center    = dot2;
		var points2   = this._initSecondCoords(tmp);
		this._points2 = this._initFirstCoords(tmp);
		this.secondBtn.attr({points:this._points2});

		tmp.center    = dot3;
		var points3   = this._initSecondCoords(tmp);
		this._points3 = this._initFirstCoords(tmp);
		this.thirdBtn.attr({points:this._points3});

		var that = this;

		anime({
            targets: ["#firstBtnController"],
            points:points1.join(','),
            duration:200,
            easing:'linear',
            complete:function(){},
        });

        anime({
            targets: ["#secondBtnController"],
            points:points2.join(','),
            duration:200,
            easing:'linear',
            complete:function(){},
        });

        anime({
            targets: ["#thirdBtnController"],
            points:points3.join(','),
            duration:200,
            easing:'linear',
            complete:function(){that.animationFinish = true;that.controllShowed = true;},
        });
		

	}

	hideControll(callback)
	{
		if(!this.animationFinish){return false;}

		this.animationFinish = false;
		var that = this;
		anime({
            targets: ["#firstBtnController"],
            points:this._points1.join(','),
            duration:200,
            easing:'linear',
            complete:function(){},
        });

        anime({
            targets: ["#secondBtnController"],
            points:this._points2.join(','),
            duration:200,
            easing:'linear',
            complete:function(){},
        });

        anime({
            targets: ["#thirdBtnController"],
            points:this._points3.join(','),
            duration:200,
            easing:'linear',
            complete:function(){that.animationFinish = true;that.controllShowed = false;callback?callback():false},
        });
	}

	next()
	{
		if(!this.animationFinish){return false;}
		this.animationFinish =false;
		var id = this.activeWork.id;
		var category = this.activeWork.category;
		var nextActiveWork = null;
		
		if(category.works[id+1])
		{
		 	nextActiveWork = category.works[id+1];
		}
		else
		{
			nextActiveWork = category.works[0];
		}
		var that = this;
		this.activeWork = nextActiveWork;
		anime({
      		targets: ["#viewElement"],
      		fill:this.activeWork.data.mainColor,
		    duration:500,
		    easing:'linear',
		    complete:function(){that.animationFinish = true;}
		});
		this.workTarget.attr({href:this.activeWork.data.image});
		this._setWorkImgPosition();
	}

	previous()
	{
		if(!this.animationFinish){return false;}
		this.animationFinish =false;
		var id = this.activeWork.id;
		var category = this.activeWork.category;
		var previousActiveWork = null;
		
		if(category.works[id-1])
		{
		 	previousActiveWork = category.works[id-1];
		}
		else
		{
			previousActiveWork = category.works[category.works.length-1];
		}
		
		this.activeWork = previousActiveWork;
		var that = this;
		anime({
      		targets: ["#viewElement"],
      		fill:this.activeWork.data.mainColor,
		    duration:500,
		    easing:'linear',
		    complete:function(){that.animationFinish = true;}
		});
		this.newxtWorkTarget.attr({opacity:0,href:this.activeWork.data.image});
		this.workTarget.attr({href:this.activeWork.data.image});
		this._setWorkImgPosition();

	}

	closeView(callback)
	{
		if(!this.animationFinish || !this.activeWork){return false;}
		var that = this;
		that.activeWork.hideWork(that.workTarget);
		that.animationFinish = false;
		anime({
            targets: ["#viewElement"],
            points:that._initSecondCoords(that.activeWork).join(','),
            duration:200,
            easing:'linear',
            complete:function(){
            	anime({
            		targets: ["#viewElement"],
		            points:that._initFirstCoords(that.activeWork).join(','),
		            duration:100,
		            easing:'linear',
		            complete:function()
		            {
		            	that.activeWork.category.parent.grid.snap.attr("class","HexGrid");
		            	that.bodyGroup.select(".CategoryGrid").before(that.bodyGroup.select(".HexGrid"));
		            	that.activeWork = null;
		            	that.animationFinish = true;
		            	that.viewShowed = false;
		            	callback?callback():false;
		            }
            	});
            },
            });
	}

	openView(activeWork)
	{
		this.activeWork = activeWork;

		if(!this.animationFinish || !this.activeWork){return false;}
		var that = this;

		that.animationFinish = false;
		that.viewElement.attr("points",that._initFirstCoords(that.activeWork).join(','));
		that.viewElement.attr({style:"fill:"+that.activeWork.data.mainColor});
		that.bodyGroup.select(".workView").after(that.bodyGroup.select(".HexGrid"));
				anime({
                targets: ["#viewElement"],
                points:that._initSecondCoords(that.activeWork).join(','),
                duration:100,
                easing:'linear',
                complete:function(){
                    anime({
	                    targets: ["#viewElement"],
	                    points:that._initFirdCoords(that.activeWork).join(','),
	                    duration:200,
	                    easing:'linear',
	                    complete:function()
	                    {
	                    	that.viewShowed = true;
	                    	that.animationFinish = true;
	                    	that.activeWork.category.parent.haveNotPlace = false;
	                    	that.activeWork.category.parent.grid.snap.attr("class","HexGrid viewHexGrid");
	                    	
	                    	that.workTarget.attr({href:that.activeWork.data.image});
	                    	that.activeWork.showWork(that.workTarget)
	                    	that._setWorkImgPosition(1);
	                    },
                    });
                },
                });
	}
	_setWorkImgPosition(isFirstView)
	{
		if(isFirstView)
		{
			this.workTarget.attr("width",this.activeWork.data.width).attr("height",this.activeWork.data.height)
		}
		var coords = this.workTarget.node.getBoundingClientRect();
		var width  = coords.width;
		var height = coords.height;

	    var s  = this.activeWork.data.height/this.activeWork.data.width;
	    var s2 = this.activeWork.data.width/this.activeWork.data.height;
	    var winWidth  = document.documentElement.clientWidth;
		var winHeight = document.documentElement.clientHeight;
		
		if(winWidth > winHeight)
		{
			if(winWidth<=winHeight*s2)
			{
				this.workTarget.attr("width",winWidth).attr("height",winWidth*s);
				this.workTarget.attr("x",0).attr("y",(winHeight-winWidth*s)/2);
			}
			else
			{
				this.workTarget.attr("width",winHeight*s2).attr("height",winHeight);
				this.workTarget.attr("x",(winWidth-winHeight*s2)/2).attr("y",0);
			}

		}
		else
		{
			this.workTarget.attr("width",winWidth).attr("height",winHeight*s);
			this.workTarget.attr("x",0).attr("y",(winHeight-winHeight*s)/2);
		}
	}

	_getOffset(bodyGroup)
	{
		var transform = bodyGroup.node.getAttribute("transform")
		if(transform)
		{
			transform = transform.split('(')[1];
			transform = transform.split(')')[0];
			transform = transform.split(',');
			var offsetX   = transform[4];
			var offsetY   = transform[5];
			return {x:offsetX,y:offsetY};
		}
		else
		{
			return{x:0,y:0}
		}
	}

	_initFirstCoords(work)
	{
		var coords  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for(var i=0; i<coords.length;i+=2)
		{
			coords[i]   = work.center.x + coords[i];
			coords[i+1] = work.center.y + coords[i+1];
		}
		return coords;
	}

	_initSecondCoords(work)
	{
		var coords = [6.123233995736766e-17, -1, 0.8660254037844386, -0.5, 0.8660254037844387, 0.49999999999999983, 6.123233995736766e-17, 1, -0.8660254037844385, 0.5000000000000003, -0.866025403784439, -0.4999999999999994, -1.8369701987210297e-16, -1];
		for(var i=0; i<coords.length;i+=2)
		{
			coords[i]   = (work.center.x + coords[i]   * work.category.parent.grid.hexRadius).toFixed(6);
			coords[i+1] = (work.center.y + coords[i+1] * work.category.parent.grid.hexRadius).toFixed(6);
		}
		return coords;			
	}

	_initFirdCoords(work)
	{
		var offset = this._getOffset(this.bodyGroup);
	    var thisWidth  = document.documentElement.clientWidth;
	    var thisHeight = document.documentElement.clientHeight;
	    var newCoords  = [
		    work.center.x,0,
		    thisWidth-offset.x,0,
		    thisWidth-offset.x,thisHeight-offset.y,
		    work.center.x,thisHeight-offset.y,
		    0,thisHeight-offset.y,
		    0,0,
		    work.center.x,0
	    ];
	    return newCoords;		
	}
}