//TODO Send a request after rating to refresh Or refresh
//I can do it better, this is truly ugly
$(document).ready(function() {
	$('#rate').submit(function(event) {
		event.preventDefault();
		var username = $(this).find("input[name='username']").val(),
			email = $(this).find("input[name='email']").val(),
			rating = $(this).find("input[name='rating']").val();
		if (!email.length && !rating.length) {
			$.ajax({
				url: '/parents/view_teachers',
				method: 'POST',
				data: {
					username: username
				},
				success: function(response) {
					var x = "<tr><td>Teacher First Name</td><td>Teacher Last Name</td><td>Teacher Email</td><td>Average Rating</td></tr>"
					response[0].forEach(function(a) {
						x += "<tr>";
						x += "<td>" + a.first_name + "</td>";
						x += "<td>" + a.last_name + "</td>";
						x += "<td>" + a.emp_email + "</td>";
						x += "<td>" + a.average_rating + "</td>";
						x += "</tr>";
					});
					$('#teachers').empty().append(x);
				},
				error: function() {
					alert('An Error Occured');
					console.log('An Error Occured');
				}
			});
		} else {
			$.ajax({
				url: '/parents/rate_teachers',
				type: 'POST',
				data: {
					username: username,
					email: email,
					rating: rating
				},
				success: function(response) {
					console.log(response);
					alert('Rated Successfully');
					$.ajax({
						url: '/parents/view_teachers',
						method: 'POST',
						data: {
							username: username
						},
						success: function(response) {
							var x = "<tr><td>Teacher First Name</td><td>Teacher Last Name</td><td>Teacher Email</td><td>Average Rating</td></tr>"
							response[0].forEach(function(a) {
								x += "<tr>";
								x += "<td>" + a.first_name + "</td>";
								x += "<td>" + a.last_name + "</td>";
								x += "<td>" + a.emp_email + "</td>";
								x += "<td>" + a.average_rating + "</td>";
								x += "</tr>";
							});
							$('#teachers').empty().append(x);
						},
						error: function() {
							alert('An Error Refreshing');
							console.log('An Error Refreshing');
						}
					});
				},
				error: function() {
					console.log('An Error Occurred');
					alert('An Error Occurred');
				}
			});
		}
	});
});