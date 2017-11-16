$(document).ready(function() {
	$('#view_schools').submit(function(event) {
		event.preventDefault();
		var username = $(this).find("input[name='username']").val();
		if (!username || username.length == 0) {
			alert('Invalid Input');
			return;
		}
		var posting = $.post('/parents/view_my_schools', {
			username: username
		});
		posting.done(function(data) {
			if (!data) {
				alert('No Data At Server');
				console.log(data);
				return;
			}
			var x = "<tr><td>School Name</td><td>School Email</td></tr>";
			data[0].forEach(function(a) {
				x += "<tr>";
				x += "<td>" + a.sname + "</td>";
				x += "<td>" + a.semail + "</td>";
				x += "</tr>";
			});
			$('#schools').empty().append(x);
		});
	});
	$('#review_schools').submit(function(event) {
		event.preventDefault();
		var username = $(this).find("input[name='username']").val();
		var school_email = $(this).find("input[name='semail']").val();
		var review = $(this).find("textarea[name='review']").val();
		$.ajax({
			url: '/parents/review_schools',
			type: 'POST',
			data: {
				username: username,
				semail: school_email,
				review: review
			},
			success: function (response){
				alert('Review Saved Successfully.' + response.affectedRows + ' Affected Rows');
			},
			error: function (){
				alert('An Error Occurred');
			}
		});
	});
});