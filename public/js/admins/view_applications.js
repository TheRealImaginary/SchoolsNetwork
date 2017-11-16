$(document).ready(function() {
	$('table').hide();
	$('#form').submit(function(event) {
		event.preventDefault();
		var email = $(this).find("input[name='school_email']").val();

		var posting = $.post('/admins/view_applications', {
			school_email: email
		});

		posting.done(function(data) {
			if (!data) {
				alert('No data at server');
				return;
			}
			var x = "<tr><td>Parent Username</td><td>Child SSN</td><td>School Email</td><td>Status</td></tr>";
			data.forEach(function(a) {
				x += "<tr>";
				x += "<td>" + a.username + "</td>";
				x += "<td>" + a.ssn + "</td>";
				x += "<td>" + a.email + "</td>";
				x += "<td>" + a.accepted + "</td>";
				x += "</tr>";
			});
			$('#applications').empty().show(600).append(x);
		});
	});
});