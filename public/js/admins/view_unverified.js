$(document).ready(function() {
	$('table').hide();
	$('#form').submit(function(event) {
		event.preventDefault();
		var email = $(this).find("input[name='school_email']").val();

		var posting = $.post('/admins/view_unverified', {
			school_email: email
		});

		posting.done(function(data) {
			if (!data) {
				alert('No data at server');
				return;
			}
			var x = "<tr><td>First Name</td><td>Middle Name</td><td>Last Name</td><td>Birth Date</td><td>Address</td><td>Email</td><td>Gender</td></tr>";
			data.forEach(function(a) {
				x += "<tr>";
				x += "<td>" + a.first_name + "</td>";
				x += "<td>" + a.middle_name + "</td>";
				x += "<td>" + a.last_name + "</td>";
				x += "<td>" + a.birth_date + "</td>";
				x += "<td>" + a.address + "</td>";
				x += "<td>" + a.emp_email + "</td>";
				x += "<td>" + a.gender + "</td>";
				x += "</tr>";
			});
			$('#unverified').empty().show(600).append(x);
		});
	});
});