$(document).ready(function() {
	$('table').hide();
	$('#form').submit(function(event) {
		event.preventDefault();
		var email = $(this).find("input[name='school_email']").val();

		var posting = $.post('/admins/view_enrolled', {
			school_email: email
		});

		posting.done(function(data) {
			if (!data) {
				alert('No data at server');
				return;
			}
			var x = "<tr><td>SSN</td><td>Name</td><td>age</td><td>Birth Date</td><td>parent's username</td><td>Gender</td></tr>";
			data.forEach(function(a) {
				x += "<tr>";
				x += "<td>" + a.ssn + "</td>";
				x += "<td>" + a.name + "</td>";
				x += "<td>" + a.age + "</td>";
				x += "<td>" + a.birth_date + "</td>";
				x += "<td>" + a.parent_username + "</td>";
				x += "<td>" + a.gender + "</td>";
				x += "</tr>";
			});
			$('#students').empty().show(600).append(x);
		});
	});
});
