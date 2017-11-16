$(document).ready(function() {
	$('form').submit(function(event) {
		event.preventDefault();
		var duedate = $(this).find("input[name='duedate']").val();
		var content = $(this).find("textarea").val();
		var course_code = $(this).find("input[name='course_code']").val();
		var email = $(this).find("input[name='email']").val();
		$.ajax({
			url: '/teachers/post_assignment',
			method: 'POST',
			data: {
				duedate: duedate,
				content: content,
				course_code: course_code,
				email: email
			},
			success: function(result) {
				console.log(result);
				alert('success');
			}
		});
	});
});