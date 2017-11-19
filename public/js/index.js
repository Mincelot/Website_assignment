var page = 1;
$(function (){

	//Load latest photos
	loadPhotos(page);

	window.addEventListener('scroll', function(e){
		if(window.scrollY > document.body.scrollHeight *(2/3) && !isLoading){
			page++;
			loadPhotos(page);
		}
	});
})

