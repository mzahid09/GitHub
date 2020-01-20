var LoadA = {
    generateDiagram: function(pagecontextref) {
	'use strict)';
	
	$(function(){

		var bookOptions = {
			 height   : 500
			,width    : 800
			// ,maxWidth : 800
			,maxHeight : 600

			,centeredWhenClosed : true
			,hardcovers : true
			,toolbar : "lastLeft, left, right, lastRight, toc, zoomin, zoomout, slideshow, flipsound, fullscreen, thumbnails, download"
			,thumbnailsPosition : 'left'
			,responsiveHandleWidth : 50

			,container: window
			,containerPadding: "20px"
			// ,toolbarContainerPosition: "top" // default "bottom"

			// Uncomment the option toc to create a Table of Contents
			// ,toc: [                    // table of contents in the format
			// 	[ "Introduction", 2 ],  // [ "title", page number ]
			// 	[ "First chapter", 5 ],
			// 	[ "Go to codecanyon.net", "http://codecanyon.net" ] // or [ "title", "url" ]
			// ]
		};

		$('#book').wowBook( bookOptions ); // create the book

		// How to use wowbook API
		// var book=$.wowBook("#book"); // get book object instance
		// book.gotoPage( 4 ); // call some method

	})	


}};