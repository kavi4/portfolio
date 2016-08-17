
//= Dot.js

//= Hex.js

//= HexGrid.js

var snap = Snap('#Container');
var groupHexGrid = snap.g().attr("class","HexGrid");

var hexGrid = new HexGrid({
	wWidth       : document.documentElement.clientWidth,
	wHeight      : document.documentElement.clientHeight,
	hexRadius    : 50
});

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