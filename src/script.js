(function () {
    var addFaceInfo = function () {
	var regexp = /^声[ \-：:]*(.+)[、,\(\)]*.*$/;
	return function ( dd ) {
	    function appendFace() {
		if( xhr.readyState == 4 ) {
		    var resp = JSON.parse(xhr.responseText),
		    image_url = resp.responseData.results[0].tbUrl,
		    image = document.createElement( 'img' );
		    image.src = image_url;
		    dd.appendChild( image );
		}
	    }

	    function getImageUrl( query, callback ) {
		xhr.open( 'GET', 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=1&imgtype=face&q=声優 ' + query, true );
		xhr.onreadystatechange = callback;
		xhr.send();
	    }

	    var xhr = new XMLHttpRequest();
	    if ( regexp.test( dd.innerText ) ) {
		console.log( RegExp.$1 );
		getImageUrl( RegExp.$1, appendFace );
	    }
	};
    }();

    var dds = document.getElementsByTagName('dd');
    for ( var i = 0, dds_length = dds.length; i < dds_length; i++) {
	addFaceInfo( dds[i] );
    }
})();
