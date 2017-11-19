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
	$.ajax({ // Request photos
		type: 'GET',
		url: 'https://api.unsplash.com/photos?per_page=30&order_by=latest&client_id='+clientId+'&page='+p,
		success: function(data){
			isLoading = false;
			var column1 = document.getElementsByClassName('column-1')[0];
			var column2 = document.getElementsByClassName('column-2')[0];
			var column3 = document.getElementsByClassName('column-3')[0];
			//console.log(data);
			var k = 0;
			for(var i in data){
				var image = data[i];
				var elem = dommy({
					tag:'div',
					attributes:{class:'image-holder', style:'padding-top:'+(data[i].height/data[i].width)*100+'%; background:'+data[i].color+';', id:data[i].id},
					events:{
						click:function(){
							retrievePhoto(this.id);
						}
					},
					children:[
					{
						tag:'img',
						attributes:{src:data[i].urls.regular, class:'image'},
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
									attributes:{src:data[i].user.profile_image.small, class:'image'}
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
									children:[{type:'text',value:data[i].user.name}]
								},
								{
									tag:'div',
									attributes:{'class':'username'},
									children:[{type:'text',value:'@'+data[i].user.username}]
								}
								]
							}
							]
						}
						]
					}
					]
				});
				elem.imgData = JSON.parse(JSON.stringify(data[i]));
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
		}
	});
}