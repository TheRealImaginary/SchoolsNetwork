//TODO CHANGE DONE FUNCTION BELOW
$(document).ready(function() {
	$('#form').submit(function(event) {
		event.preventDefault();
		var username = $(this).find("input[name='username']").val();
		if (!username || username.length == 0) {
			alert('Invalid Input');
			return;
		}
		var posting = $.post('/parents/view_school_reviews', {
			username: username
		});
		posting.done(function(data) {
			if (!data) {
				alert('No Data At Server');
				return;
			}
			var x = "<tr><td>School Name</td><td>School Email</td><td>Username</td><td>Review</td></tr>";
			data[0].forEach(function(a) {
				x += "<tr>";
				x += "<td>" + a.name + "</td>";
				x += "<td>" + a.school_email + "</td>";
				x += "<td>" + a.username + "</td>";
				x += "<td>" + a.review + "</td>";
				x += "</tr>";
			});
			$('#reviews').empty().append(x);
		});
	});
	$('#reviews').on('click', 'tr', function() {
		$(this).css('color', 'red').fadeOut(400);
		var semail = null,
			username = null;
		$.each($(this).find('td'), function(i) {
			if (i == 1)
				semail = $(this).text();
			else if (i == 2)
				username = $(this).text();
		});
		$.ajax({
			url: '/parents/delete_schools_reviews',
			method: 'DELETE',
			data: {
				semail: semail,
				username: username
			},
			success: function(response) {
				alert('Review Deleted Successfully');
			}
		});
	});
});