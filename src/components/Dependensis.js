;var dependensis = (function(){
	var result = {};

	result.rerenderhexGrid = function(hexGrid)
	{
		window.addEventListener// дорендер сетки
		(	
			"resize",
			function()
			{
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

	result.resizeCategoryes = function(hexGrid,categoryGrid)
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

					categoryGrid.render();

					lastHeight = thisHeight;
					lastWidth  = thisWidth;
				}

				if(thisHeight - lastHeight >= 2*hexGrid.heightHexRow || thisWidth - lastWidth >= 2*hexGrid.widthHex)
				{
					categoryGrid.render();
					lastHeight = thisHeight;
					lastWidth  = thisWidth;
				}

			}
		);
	}

	result.categoryes = function(body,hexGrid,categoryGrid)
	{
		var startX,startY;
		var startShiftX;
		var startShiftY;
		var maxMovingWidth;
		var maxMovingHeight;

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
				

				if(shiftX > 0)
				{
					shiftX = 0;
				}
				if(shiftX <=  -maxMovingWidth)
				{
					shiftX = -maxMovingWidth;
				}

				if(shiftY > 0)
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

		function getmatrix(element)
		{
			var matrix = new Snap.Matrix();
			var translate = element.getAttribute("transform");
		}
	}
	return result;
})();