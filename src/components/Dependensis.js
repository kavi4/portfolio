;var dependensis = (function(){
	var result = {};

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

	result.supportResizingCategoryes = function(hexGrid,categoryGrid)
	{
		var lastWidth  = document.documentElement.clientWidth;
		var lastHeight = document.documentElement.clientHeight;

		window.addEventListener//ререндер категорий
		(	
			"resize",
			function()
			{
				var thisWidth  = document.documentElement.clientWidth;
				var thisHeight = document.documentElement.clientHeight;

				if(thisWidth <= categoryGrid.farawayPosX || thisHeight <= categoryGrid.farawayPosY)
				{
					hexGrid.wHeight = thisHeight;//устанавливаем новое состояние документа
					hexGrid.wWidth  = thisWidth;

					categoryGrid.hide(function()
					{
						categoryGrid.render();
						categoryGrid.show();
					});
					
					lastHeight = thisHeight;
					lastWidth  = thisWidth;
				}
				
				if(thisHeight - lastHeight >= 2*hexGrid.heightHexRow || thisWidth - lastWidth >= 2*hexGrid.widthHex)
				{
					categoryGrid.hide(function()
					{
						categoryGrid.render();
						categoryGrid.show();
					});
					lastHeight = thisHeight;
					lastWidth  = thisWidth;
				}

			}
		);
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
			if(!value)
			{
				body.animate({transform:'translate(0,0)'},500,mina.linear);
			}
			else
			{
				window.addEventListener // возможность двигаться если места недостаточно
				(
					"mousedown", 
					function(event)
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
				);

				window.addEventListener
				(
					"mouseup",
					function(event)
					{
						window.removeEventListener("mousemove",move);
					}
				);

				function move(event)
				{
					if(categoryGrid.haveNotPlace)
					{
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

			}
		}
	}

	result.supportClickCategory = function(categoryGrid)
	{
		var lastTarget = null;
		categoryGrid.target.mousedown(function(event){
			var target = event.target;
			if(lastTarget!=target)
			{
				lastTarget = target;
				var id = target.getAttribute("id");
			}
		});
	}

	return result;
})();