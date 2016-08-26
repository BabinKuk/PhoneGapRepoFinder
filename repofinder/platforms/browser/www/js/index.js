$(document).ready(function(){
	document.addEventListener('deviceready', function(){
		// get repositories
		getRepos();
	});
	
	$('.ui-input-clear').click(function(){
		$('#search_list').hide();
		$('#user_info').hide();
    });
	
	// event handler
	$('#search_btn').click(function(e){
		e.preventDefault();
		
		var search_html = '';
		var user_html = '';
		var username = $('#search_input').val();
		console.log('Searching for user ' + username);
		
		var user_url = 'https://api.github.com/users/' + username;
		var repo_url = 'https://api.github.com/users/' + username + '/repos';
		
		$.ajax({
			url: repo_url,
			dataType: 'jsonp',
			success: function(response){
				console.log('looping through repositories');
				// looping through repositories
				// getting user info
				$.ajax({
					url: user_url,
					datatype:'jsonp',
					success: function(data){
						user_html = '<h3><img src="' + data.avatar_url + '" class="thumbnail"><a href="' + data.html_url + '" target="_blank">' + data.name + '</a></h3><div style="clear:both"></div><br><br>';
						$('#user_info').html(user_html);
					}
				});

				// repositories
				$.each(response.data, function(){
					search_html += '<li><h1><a href="' + this.html_url + '">' + this.name + '</a></h1><p>By ' + this.owner.login + '</p></li>';
				}); 
				$('#search_list').append(search_html);
				$('#search_list').listview("refresh");
			}
		});
	});
});

// get repositories for home screen
function getRepos(){
	console.log('getting repos');
	var html = '';
	
	$.ajax({
		url: 'https://api.github.com/repositories', // api url
		dataType: 'jsonp',
		success: function(response){
			console.log(response);
			$.each(response.data, function(i, item){
				// limit to 10 results
				if(i < 10){
					html += '<li>';
					html += '<img class="thumbnail" src="' + this.owner.avatar_url + '">';
					html += '<h1>';
					html += '<a href="' + this.html_url + '" target="_blank">';
					html += this.name;
					html += '</a>';
					html += '<p>By ' + this.owner.login;
					html += '</p>';
					html += '</h1>';
					html += '</li>';
				}
			});
			$('#repo_list').append(html);
			$('#repo_list').listview('refresh');
		}
	});
}