$(document).ready(function() {
	$('table').hide();
	$('#search').submit(function(event) {
		event.preventDefault();
		var name = $(this).find("input[name='name']").val(),
			address = $(this).find("input[name='address']").val(),
			type = $(this).find("input[name='type']").val();
		$.ajax({
			url: '/search',
			type: 'POST',
			data: {
				name: name,
				address: address,
				type: type
			},
			success: function(response) {
				var x = "<tr><td>School Email</td><td>Mission</td><td>Vision</td><td>General Info</td><td>Name</td><td>Address</td><td>Fees</td><td>Phone</td><td>Type</td><td>Main Language</td></tr>"
				response[0].forEach(function(a) {
					x += "<tr>";
					for (var key in a)
						x += "<td>" + a[key] + "</td>";
					x += "</tr>";
				});
				$('#result').empty().show(600).append(x);
			},
			error: function() {
				console.log('An Error Occurred');
				alert('An Error Occurred');
			}
		});
	});

	$('#certain').submit(function(event) {
		event.preventDefault();
		var semail = $(this).find("input[name='semail']").val();
		$.ajax({
			url: '/view_certain_school',
			type: 'POST',
			data: {
				semail: semail
			},
			success: function(response) {
				console.log(response);
			},
			error: function() {
				console.log('An Error Occurred');
				alert('An Error Occurred');
			}
		});
	});

	$('#result').on('click', 'tr', function() {
		var email = null;
		$.each($(this).find('td'), function(index) {
			if (index == 0)
				email = $(this).text();
		});
		$.ajax({
			url: '/view_certain_school_reviews',
			type: 'POST',
			data: {
				semail: email
			},
			success: function(response) {
				//console.log(response);
				var x = "<tr><td>Reviews</td></tr>";
				response.forEach(function(a) {
					x += "<tr><td>" + a.review + "</td></tr>"
				});
				$('#reviews').empty().show(600).append(x);
			},
			error: function() {
				console.log('An Error Occurred');
				alert('An Error Occurred');
			}
		});
		$.ajax({
			url: '/view_certain_school_announcements',
			type: 'POST',
			data: {
				semail: email
			},
			success: function(response) {
				//console.log(response);
				var x = "<tr><td>Announcement Title</td><td>Type</td><td>Description</td><td>Date</td></tr>"
				response.forEach(function(a) {
					x += "<tr>";
					x += "<td>" + a.title +"</td>";
					x += "<td>" + a.AnnouncementType +"</td>";
					x += "<td>" + a.description +"</td>";
					x += "<td>" + a.announcement_date +"</td>";
					x += "</tr>";
				});
				$('#announcements').empty().show(600).append(x);
			},
			error: function() {
				console.log('An Error Occurred');
				alert('An Error Occurred');
			}
		});
	});
});