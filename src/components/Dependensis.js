;var dependensis = (function(){
	var result = {};
	var wasMovingMouse = false;

	result.supportHoverEffectHexGrid = function(groupHexGrid)
	{
		groupHexGrid.mouseover(function(event){
			var target = event.target;
			target.setAttribute("class","dark");
			target.onmouseout=function(event)
			{
				setTimeout(function(event){target.setAttribute("class","")},500)
				
			};
		});

	}
	result.supportRenderingHexGrid = function(hexGrid)
	{
		window.addEventListener// дорендер сетки
		(	
			"resize",
			function()
			{
				body.animate({transform:'translate(0,0)'},500,mina.linear);

				var thisWidth  = document.documentElement.clientWidth;
				var thisHeight = document.documentElement.clientHeight;

				if(thisWidth - hexGrid.wWidth >= hexGrid.widthHex || thisHeight - hexGrid.wHeight >= hexGrid.heightHexRow)
				{
					hexGrid.wHeight = thisHeight;//устанавливаем новое состояние документа
					hexGrid.wWidth  = thisWidth;
					hexGrid.render();
				}
			}
		);
	}

	result.supportHoverEffectCatrgoryes = function(categoryGrid,container)
	{
		var hex = new Hex({x:-1000,y:-1000},categoryGrid.grid.hexRadius);
		hex.render(container);
		hex.target.attr("id","hoverCategory");
		var animation = true;

		categoryGrid.target.mouseover(function(event){
			if(animation)
			{
				var id = event.target.getAttribute("id").split("-")[0];
				var category = categoryGrid.categoryes[id];

				hex.target.attr("fill",category.mainColor);
				hex.center = category.center;
				hex.render();
				hex.target.attr("opacity",1);
				var bbox = hex.target.getBBox(); //bounding box, get coords and centre
				animation = false;
				hex.target.animate({ transform: "r1," + bbox.cx + ',' + bbox.cy + "S2," + hex.center.x + "," + hex.center.y,opacity:0}, 200,mina.linear(),function(){hex.target.attr("transform","");animation=true;});
			
			}

		});
	}

	result.supportResizingCategoryes = function(hexGrid,categoryGrid)
	{
		var lastWidth  = document.documentElement.clientWidth;
		var lastHeight = document.documentElement.clientHeight;
		var animationFinish = true;

		var timer;

		window.addEventListener("resize",resize);

		function resize(event){
			clearTimeout(timer);

			timer = setTimeout(resizeFunc, 650);
		}

		function resizeFunc(event)
		{
			if(animationFinish)
			{	
				var thisWidth  = document.documentElement.clientWidth;
				var thisHeight = document.documentElement.clientHeight;
				var activeCategy = false;

				if(thisWidth <= categoryGrid.farawayPosX || thisHeight <= categoryGrid.farawayPosY)
				{
					animationFinish = false;
					activeCategory  = categoryGrid.disableAll();
					hexGrid.wHeight = thisHeight;//устанавливаем новое состояние документа
					hexGrid.wWidth  = thisWidth;
					categoryGrid.hide(function()
					{
						categoryGrid.render(0,function()
						{				
							if(activeCategory)
							{
								activeCategory.renderWorks(0,function()
								{categoryGrid.haveNotPlace=false
									activeCategory.show();
									activeCategory.showWorks(function(){activeCategory.active=true;animationFinish = true;activeCategory=false;result.reRenderHexGrid(hexGrid,categoryGrid);})
								})
							}
							else
							{
								categoryGrid.show(function(){animationFinish = true;})
							}      
							
						})
					});
					lastHeight = thisHeight;
					lastWidth  = thisWidth;
					return false;
				}
				
				if(thisHeight - lastHeight >= 2*hexGrid.heightHexRow || thisWidth - lastWidth >= 2*hexGrid.widthHex)
				{
					animationFinish = false;
					activeCategory  = categoryGrid.disableAll();
					categoryGrid.hide(function()
					{
						categoryGrid.render(0,function()
						{					
							if(activeCategory)
							{categoryGrid.haveNotPlace=false
								activeCategory.renderWorks(0,function()
								{
									activeCategory.show();
									activeCategory.showWorks(function(){activeCategory.active=true;animationFinish = true;activeCategory=false;result.reRenderHexGrid(hexGrid,categoryGrid);})
								})
							}
							else
							{
								categoryGrid.show(function(){animationFinish = true;})
							}      
							
						})
					});
					// categoryGrid.hide(function(){categoryGrid.render(0,function(){categoryGrid.show(function(){if(activeCategory){activeCategory.renderWorks(0,function(){activeCategory.showWorks(function(){animationFinish = true;})})}       })})});
					lastHeight      = thisHeight;
					lastWidth       = thisWidth;
				}
			}
		}
	}

	result.supportMovingcategoryes = function(body,hexGrid,categoryGrid)
	{
		var startX,startY;
		var startShiftX;
		var startShiftY;
		var maxMovingWidth;
		var maxMovingHeight;

		categoryGrid.onhaveNotPlaceChanged = function(value)
		{
				function mouseDownListener(event)
				{
					maxMovingWidth  = hexGrid.nWidth  * hexGrid.widthHex     - hexGrid.indentLeft   - hexGrid.wWidth;
					maxMovingHeight = hexGrid.nHeight * hexGrid.heightHexRow - hexGrid.heightHexRow - hexGrid.wHeight;

					startX = event.clientX;
					startY = event.clientY;
					startShiftX = body.attr("transform").globalMatrix.e;
					startShiftY = body.attr("transform").globalMatrix.f;

					if(event.which == 1)
					{
						window.addEventListener("mousemove",move);
					}
				}

				function mouseUpListener(event)
				{
					wasMovingMouse = false;
					window.removeEventListener("mousemove",move);
				}

				function move(event)
				{
					if(categoryGrid.haveNotPlace)
					{
						wasMovingMouse = true;
						var matrix = new Snap.Matrix();
						var shiftX = event.clientX - startX + startShiftX;
						var shiftY = event.clientY - startY + startShiftY;

						if(shiftX >= 0)
						{
							shiftX = 0;
						}
						if(shiftX <=  -maxMovingWidth)
						{
							shiftX = -maxMovingWidth;
						}
						if(shiftY >= 0)
						{
							shiftY = 0;
						}
						if(shiftY <= -maxMovingHeight)
						{
							shiftY = -maxMovingHeight;
						}

						matrix.translate(shiftX,shiftY);
						body.attr({"transform":matrix});
					}
				}

			if(!value)
			{
				body.animate({transform:'translate(0,0)'},100,mina.linear);
				window.removeEventListener("mousedown", mouseDownListener);
				window.removeEventListener("mouseup", mouseUpListener);
			}
			else
			{
				window.addEventListener("mousedown", mouseDownListener);
				window.addEventListener("mouseup",mouseUpListener);
			}
		}
	}

	result.supportClickCategory = function(categoryGrid,worksGrid,hexGrid)
	{
		var animationFinish = true;
		categoryGrid.target.mousedown(function(event)
		{
			categoryGrid.target.node.onmouseup=mouseUp;
		});

		function mouseUp(event)
		{
			if(!wasMovingMouse)
			{
				if(animationFinish)
				{
					animationFinish = false;
					var target = event.target;
					var id = +target.getAttribute("id").split("-")[0];
					var category = categoryGrid.categoryes[id];
					if(!category.active)
					{
						category.active = true;
						categoryGrid.hide(function(){
						 	category.worksRendered?category.renderWorks():category.renderWorks(worksGrid);
						 	category.showWorks(function(){wasMovingMouse=false;animationFinish=true;result.reRenderHexGrid(hexGrid,categoryGrid);});
						 });
					}
					else
					{
						category.hideWorks(function(){categoryGrid.show(function(){wasMovingMouse=false;animationFinish = true; category.active = false;if(!categoryGrid.haveNotPlace){var event = new Event("resize");window.dispatchEvent(event);}});});
					}
				}else{return false;}
			}

		}
	}

		result.reRenderHexGrid = function(hexGrid,categoryGrid)
		{
			var nx = Math.ceil(categoryGrid.farawayPosX/categoryGrid.grid.widthHex)+1;
			var ny = Math.ceil(categoryGrid.farawayPosY/categoryGrid.grid.heightHexRow)+1;
			hexGrid.render(0,nx,ny);
		}


		result.supportClickWork = function(protoWorksGrid,categoryGrid,controll)
		{
			var catId = "";
			var work = {};
			protoWorksGrid.mousedown(function(event){
				protoWorksGrid.mouseup(function(event){
					if(!wasMovingMouse)
					{
						catId = event.target.getAttribute("id").split("-")[1];
						var workId = event.target.getAttribute("id").split("-")[0];
						work = categoryGrid.categoryes[catId].works[workId];
						controll.openView(work);

						//setTimeout(function(){controll.closeView();},2000);

						window.addEventListener("resize",resizeView);
						function resizeView(event)
						{
							if(controll.viewShowed)
							{
								controll.viewElement.attr({points:controll._initFirdCoords(work)});
								controll._setWorkImgPosition();
							}
						}
					}
				});
			});
		}

		result.supportControll = function(hexGrid,controll,categoryGrid)
		{
			controll.secondBtn.click(function(event){
				controll.hideControll(function(){controll.closeView(function(){categoryGrid.getDots();});});
			});
			controll.firstBtn.click(function(event){
				controll.previous();
			});
			controll.thirdBtn.click(function(event){
				controll.next();
			});

			window.addEventListener("click",function(event){
				if(!controll.viewShowed){return false;}
				if(controll.controllShowed)
				{
					var id = event.target.getAttribute("id");
					if(id!="firstBtnController" && id!="secondBtnController" && id !="thirdBtnController")
					controll.hideControll();
				}
				else
				{
					controll.showControll(getCenter(event));
				}
			});

			function getCenter(event)
			{

				var x = event.clientX;
				var y = event.clientY;
				
				var ny = Math.ceil((y /* hexGrid.indentTop*/  ) / hexGrid.heightHexRow);
				var nx = 0;

				if(ny%2==0)
				{
					nx = Math.ceil((x- hexGrid.indentLeft) / hexGrid.widthHex);
					x= nx*hexGrid.widthHex
				}else
				{
					nx = Math.ceil((x  - hexGrid.indentLeft) / hexGrid.widthHex);
					x  = nx*hexGrid.widthHex + hexGrid.indentLeft;
				}

				y = ny*hexGrid.heightHexRow-hexGrid.indentTop;

				return {x,y};
			}
		}

	return result;
})();