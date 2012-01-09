var dds = document.getElementsByTagName('dd');

var addFaceInfo = function() {
    var regexp = /^声[ \-：:]*(.+)[、,]*.*$/;
    return function( dd ) {
	var xhr = new XMLHttpRequest();
	if ( regexp.test( dd.innerText ) ) {
	    console.log( RegExp.$1 );
	    getImageUrl( RegExp.$1, appendFace );
	}

	function appendFace() {
	    if( xhr.readyState == 4 ) {
		var resp = JSON.parse(xhr.responseText);
		var image_url = resp.responseData.results[0].tbUrl;
		var image = document.createElement( 'img' );
		image.src = image_url;
		dd.appendChild( image );
	    }
	}

	function getImageUrl( query, callback ) {
	    xhr.open( 'GET', 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=1&imgtype=face&q=' + query, true );
	    xhr.onreadystatechange = callback;
	    xhr.send();
	}

    }
}();

for( var i=0; i < dds.length; i++ ){
    addFaceInfo( dds[i] );
}

