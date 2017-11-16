$(document).ready(function() {
	$('table').hide();
	$('#form1').submit(function(event) {
		event.preventDefault();
		var email = $(this).find('input').val();
		$.ajax({
			url: '/teachers/view_assignments',
			method: 'POST',
			data: {
				email: email
			},
			success: function(result) {
				var x = "<tr><td>Assignment_id</td><td>Student SSN</td><td>Solution</td></tr>";
				result[0].forEach(function(a) {
					x += "<tr>";
					x += "<td>" + a.assignment_id + "</td>";
					x += "<td>" + a.student_ssn + "</td>";
					x += "<td>" + a.Solution + "</td>";
					x += "</tr>";
				});
				$("table").empty().show(600).append(x);
			},
			error: function() {
				alert('Error');
			}
		});
	});
	$('#form2').submit(function(event) {
		event.preventDefault();
		var assignmentid = $(this).find("input[name='assignmentid']").val();
		var grade = $(this).find("input[name='grade']").val();
		var email = $(this).find("input[name='email']").val();
		var studentssn = $(this).find("input[name='studentssn']").val();
		$.ajax({
			url: '/teachers/view_assignments',
			method: 'POST',
			data: {
				assignmentid: assignmentid,
				grade: grade,
				studentssn: studentssn

			},
			success: function(result) {
				alert('success');
			},
			error: function() {
				alert('Error');
			}
		});
	});
});