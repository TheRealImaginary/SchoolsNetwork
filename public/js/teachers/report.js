$(document).ready(function() {
	$('form').submit(function(event) {
		event.preventDefault();
		var email = $(this).find("input[name='email']").val();
		var comments = $(this).find("input[name='comments']").val();
		var ssn = $(this).find("input[name='ssn']").val();
		$.ajax({
			url: '/teachers/report',
			method: 'POST',
			data: {
				email: email,
				ssn: ssn,
				comments: comments
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