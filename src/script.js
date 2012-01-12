(function () {
     var addFaceInfo = function () {
	 var regexp = /^声[ \-：:]*([^、,（）\(\)]+)/;

	 return function ( dd ) {
	     var xhr = new XMLHttpRequest();

	     function parseAndAddInfo() {
		 if( xhr.readyState == 4 ) {
		     var resp = JSON.parse(xhr.responseText),
		     image_url = resp.responseData.results[0].tbUrl;
		     image = document.createElement( 'img' );
		     image.src = image_url;
		     dd.appendChild( image );
		 }
	     }

	     function appendFace( query ) {
		 xhr.open( 'GET', 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=1&imgtype=face&q=声優 ' + query, true );
		 xhr.onreadystatechange = parseAndAddInfo;
		 xhr.send();
	     }

	     if ( regexp.test( dd.innerText ) ) {
		 if (RegExp.$1 === ' ') { return; } // Return if the query isn't a name.
		 appendFace( RegExp.$1 );
	     }
	 };
     }();

     var dds = document.getElementsByTagName('dd');
     var i = 0, dds_length = dds.length;
     for (; i < dds_length; i++) {
	 addFaceInfo( dds[i] );
     }
 })();
