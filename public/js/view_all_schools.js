$(document).ready(function() {
	$('table').hide();
	$.ajax({
		url: '/view_all_schools',
		method: 'GET',
		success: function(result) {
			var x = "<tr><td>School Name</td><td>School Email</td><td>Type</td><td>Level</td></tr>";
			result[0].forEach(function(a) {
				x += "<tr>";
				x += "<td>" + a.name + "</td>";
				x += "<td>" + a.email + "</td>";
				x += "<td>" + a.type + "</td>";
				x += "<td>" + a.level + "</td>";
				x += "</tr>";
			});
			$("#results").empty().show(500).append(x);
		},
	});
	$('table').on('click', 'tr', function() {
		var email = null;
		$.each($(this).find('td'), function(i) {
			if (i == 1)
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
					x += "<td>" + a.title + "</td>";
					x += "<td>" + a.AnnouncementType + "</td>";
					x += "<td>" + a.description + "</td>";
					x += "<td>" + a.announcement_date + "</td>";
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