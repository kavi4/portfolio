
var RandID = function(num)
{
	var length = 8;
	var time = +new Date();
		 
	var _getRandomInt = function( min, max ) 
	{
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
	}

	var ts = time.toString();
	var parts = ts.split( "" ).reverse();
	var id = "";
	for( var i = 0; i < length; ++i ) 
	{
		var index = _getRandomInt( 0, parts.length - 1 );
		id += parts[index];
	}
	return num+"-"+id;

}