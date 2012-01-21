// ==UserScript==
// @name         Wikipedia Voice Actor Face
// @namespace    https://github.com/jewel12/cv-face
// @description  日本語 Wikipedia 記事上の声優名の横に声優さん画像を展開するエクステンション
// @include      http://ja.wikipedia.org/wiki/*
// ==/UserScript==

(function () {
     var addFaceInfo = function () {
	 var regexp = /^声[ \-：:]*([^、,（）\(\)]+)/;

	 return function ( dd ) {
	     var xhr = new XMLHttpRequest();

	     function parseAndAddInfo(xhr) {
		 if( xhr.readyState == 4 ) {
		     var resp = JSON.parse(xhr.responseText),
		     image_url = resp.responseData.results[0].tbUrl;
		     image = document.createElement( 'img' );
		     image.src = image_url;
		     dd.appendChild( image );
		 }
	     }

	     function appendFace( query ) {
		 url = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=1&imgtype=face&q=声優 ' + query;
		 try {
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				onload: parseAndAddInfo
			});
		} catch(err) {
		alert(query);
			 xhr.open( 'GET', url, true );
			 xhr.onreadystatechange = function() {parseAndAddInfo(xhr);};
			 xhr.send();
		}
	     }
	     
	     if ( regexp.test( dd.textContent ) ) {
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
