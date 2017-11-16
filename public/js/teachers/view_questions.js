$(document).ready(function() {
	$('table').hide();
	$('#form1').submit(function(event) {
		event.preventDefault();
		var email = $(this).find("input[name='email']").val();
		$.ajax({
			url: '/teachers/view_questions',
			method: 'POST',
			data: {
				email: email
			},
			success: function(result) {
				var x = "<tr><td>Question_id</td><td>Question</td><td>Student</td><td>Course_Code</td><td>Answer</td></tr>";
				result[0].forEach(function(a) {
					x += "<tr>";
					x += "<td>" + a.question_id + "</td>";
					x += "<td>" + a.question + "</td>";
					x += "<td>" + a.student_ssn + "</td>";
					x += "<td>" + a.course_code + "</td>";
					x += "<td>" + (a.answer || 'None') + "</td>";
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
		var id = $(this).find("input[name='id']").val();
		var answer = $(this).find("input[name='answer']").val();
		$.ajax({
			url: '/teachers/answer_questions',
			method: 'POST',
			data: {
				id: id,
				answer: answer
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