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
	},
	{
		id     : 3,
		name   : "vector",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 4,
		name   : "rastr",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 5,
		name   : "js",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 0,
		name   : "vector",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 6,
		name   : "rastr",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 7,
		name   : "js",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 8,
		name   : "vector",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 9,
		name   : "rastr",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 10,
		name   : "js",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},{
		id     : 11,
		name   : "vector",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 12,
		name   : "rastr",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 13,
		name   : "js",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},

	{
		id     : 14,
		name   : "js",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},{
		id     : 15,
		name   : "vector",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 16,
		name   : "rastr",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 17,
		name   : "js",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 18,
		name   : "js",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},{
		id     : 19,
		name   : "vector",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 20,
		name   : "rastr",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	},
	{
		id     : 21,
		name   : "js",
		image  : "img/vector/sweet.svg",
		filter : "url(#hexFilter)"
	}

];

//= Dot.js

//= Hex.js

//= HexGrid.js

//= Category.js

//= CategoryGrid.js


//= Dependensis.js

var snap              = Snap('#Container');
var body              = snap.g().attr("class","Body");
var groupHexGrid      = body.g().attr("class","HexGrid");
var groupCategoryGrid = body.g().attr("class","CategoryGrid");

var hexGrid = new HexGrid({
	wWidth       : document.documentElement.clientWidth,
	wHeight      : document.documentElement.clientHeight,
	hexRadius    : 50
});
hexGrid.render(groupHexGrid);

var categoryGrid = new CategoryGrid({
	hexgrid : hexGrid,
	data:categoryes
});
categoryGrid.render(groupCategoryGrid);

/*hex for filter hex
var hex = new Hex(new Dot(0.5,0.5),0.5);
hex.render(snap);
*/

dependensis.rerenderhexGrid(hexGrid);
dependensis.resizeCategoryes(hexGrid,categoryGrid);
dependensis.categoryes(body,hexGrid,categoryGrid);

