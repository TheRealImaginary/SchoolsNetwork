//TODO Complete function AND SET URL/PATH AND METHOD
//Porblem In Parsing SSN
$(document).ready(function() {
	$('#form').submit(function(event) {
		event.preventDefault();
		var ssn = $(this).find("input[name='ssn']").val();
		if (!ssn || parseInt(ssn) < 0 || parseInt(ssn) == NaN) {
			alert('Values Must Be Positive');
			return;
		}
		console.log(typeof ssn);
		var posting = $.post('/parents/view_child_reports', {
			ssn: ssn
		});
		posting.done(function(data) {
			console.log(!data);
			if (!data) {
				alert('No data at server');
				return;
			}
			var x = "<tr><td>Teacher First Name</td><td>Teacher Last Name</td><td>Child Name</td><td>Report Date</td><td>Report Comments</td></tr>";
			data[0].forEach(function(a) {
				x += "<tr>";
				x += "<td>" + a.first_name + "</td>";
				x += "<td>" + a.last_name + "</td>";
				x += "<td>" + a.name + "</td>";
				x += "<td>" + a.report_date + "</td>";
				x += "<td>" + a.comments + "</td>";
				x += "</tr>";
			});
			$("#reports").empty().append(x);
		});
	});

	$('#reply').submit(function(event) {
		event.preventDefault();
		var ssn = $(this).find("input[name='ssn']").val(),
			date = $(this).find("input[name='date']").val(),
			reply = $(this).find("textarea").val(),
			username = $(this).find("input[name='username']").val();
		console.log(ssn + " " + date + " " + reply);
		$.ajax({
			url: '/parents/reply_to_reports',
			method: 'POST',
			data: {
				ssn: ssn,
				date: date,
				reply: reply,
				username: username
			},
			success: function(response) {
				alert('Replied To Report Successfully\n' + response);
			}
		});
	});
});