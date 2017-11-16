$(document).ready(function() {
	$('table').hide();
	$('form').submit(function(event) {
		event.preventDefault();
		var email = $(this).find("input[name='email']").val();
		$.ajax({
			url: '/teachers/view_students',
			method: 'POST',
			data: {
				email: email
			},
			success: function(result) {
				var x = "<tr><td>Name</td><td>SSN</td><td>Grade</td></tr>";
				result[0].forEach(function(a) {
					x += "<tr>";
					x += "<td>" + a.name + "</td>";
					x += "<td>" + a.ssn + "</td>";
					x += "<td>" + a.grade + "</td>";
					x += "</tr>";
				});
				$("table").empty().show(600).append(x);
			},
			error: function() {
				alert('Error');
			}
		});
	});
});