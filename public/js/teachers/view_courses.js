$(document).ready(function() {
	$('table').hide();
	$('form').submit(function(event) {
		event.preventDefault();
		var email = $(this).find('input').val();
		$.ajax({
			url: '/teachers/view_courses',
			method: 'POST',
			data: {
				email: email
			},
			success: function(result) {
				var x = "<tr><td>Course Name</td><td>Course_code</td><td>Description</td><td>Level</td><td>Grade</td></tr>";
				result[0].forEach(function(a) {
					x += "<tr>";
					x += "<td>" + a.name + "</td>";
					x += "<td>" + a.course_code + "</td>";
					x += "<td>" + a.description + "</td>";
					x += "<td>" + a.level + "</td>";
					x += "<td>" + a.grade + "</td>";
					x += "</tr>";
				});
				$("table").empty().show(600).append(x);
			}
		});
	});
});