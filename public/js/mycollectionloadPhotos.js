var isLoading = false;
function loadPhotos(page){
	if(isLoading){
		return;
	}
	isLoading = true;
	var p = page;
	if(!page){
		p = 1;
	}
	var photoids = [];
	$.ajax({
		type: 'GET',
		url: '/api/getUserCollection/' +username,
		success: function(data){
			for (id = 0; id < data.length; id++){
				photoids.push(data[id].imageId)
			}
			var k = 0;
			for (i = 0; i < photoids.length; i++){
				$.ajax({ // Request photos
					type: 'GET',
					url: 'https://api.unsplash.com/photos/'+photoids[i]+'?client_id='+clientId,
					success: function(data){
						isLoading = false;
						var column1 = document.getElementsByClassName('column-1')[0];
						var column2 = document.getElementsByClassName('column-2')[0];
						var column3 = document.getElementsByClassName('column-3')[0];
						var image = data;
						var elem = dommy({
							tag:'div',
							attributes:{class:'image-holder', style:'padding-top:'+(data.height/data.width)*100+'%; background:'+data.color+';', id:data.id},
							events:{
								click:function(){
									retrievePhoto(this.id);
								}
							},
							children:[
							{
								tag:'img',
								attributes:{src:data.urls.regular, class:'image'},
								events:{
									load:function(){
										this.parentNode.style.paddingTop = "0px";
									}
								}
							},
							{
								tag:'div',
								attributes:{class:'user-info'},
								children:[
								{
									tag:'div',
									attributes:{class:'all-info'},
									children:[
									{
										tag:'div',
										attributes:{class:'user-photo-container'},
										children:[
										{
											tag:'img',
											attributes:{src:data.user.profile_image.small, class:'image'}
										}
										]
									},
									{
										tag:'div',
										attributes:{class:'user-info-container'},
										children:[
										{
											tag:'div',
											attributes:{'class':'name'},
											children:[{type:'text',value:data.user.name}]
										},
										{
											tag:'div',
											attributes:{'class':'username'},
											children:[{type:'text',value:'@'+data.user.username}]
										}
										]
									}
									]
								}
								]
							}
							]
						});
						elem.imgData = JSON.parse(JSON.stringify(data));
						if(k==0)
							column1.appendChild(elem);
						if(k==1)
							column2.appendChild(elem);
						if(k==2){
							column3.appendChild(elem);
							k=-1;
						}
						k++;
					}
				});
			}
		}
	});
}
