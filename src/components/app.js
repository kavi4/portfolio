var categoryes = [
	{
		id     : 0,
		name   : "vector",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 1,
		name   : "rastr",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 2,
		name   : "js",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	}

]

//= Dot.js

//= Hex.js

//= HexGrid.js

//= Category.js

//= CategoryGrid.js

var snap              = Snap('#Container');
var groupHexGrid      = snap.g().attr("class","HexGrid");
var groupCategoryGrid = snap.g().attr("class","CategoryGrid");

var hexGrid = new HexGrid({
	wWidth       : document.documentElement.clientWidth,
	wHeight      : document.documentElement.clientHeight,
	hexRadius    : 50
});

var categoryGrid = new CategoryGrid({
	hexgrid : hexGrid,
	data:categoryes
});

/*hex for filter hex
var hex = new Hex(new Dot(0.5,0.5),0.5);
hex.render(snap);
*/

categoryGrid.render(groupCategoryGrid);
hexGrid.render(groupHexGrid);


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
