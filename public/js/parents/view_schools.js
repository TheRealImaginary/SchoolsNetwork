//TODO Choose Schools AND clear table on each request
$(document).ready(function() {
	$('#form').submit(function(event) {
		console.log(22);
		event.preventDefault();
		var username = $('#form').find("input[name='username']").val();
		if (!username.length) {
			alert('Username cannot be empty');
			return;
		}
		var posting = $.post('/parents/view_accepted_schools', {
			username: username
		});
		posting.done(function(data) {
			if (!data) {
				alert('No data at server');
				return;
			}
			var x = "<tr><td>School Name</td><td>School Email</td><td>Child Name</td><td>Child SSN</td><td>Status</td></tr>";
			data[0].forEach(function(a) {
				x += "<tr>";
				x += "<td>" + a.sName + "</td>";
				x += "<td>" + a.sEmail + "</td>";
				x += "<td>" + a.name + "</td>";
				x += "<td>" + a.ssn + "</td>";
				x += "<td>" + a.accepted + "</td>";
				x += "</tr>";
			});
			$("#schools").empty().append(x);
		});
	});

	$('#schools').on('click', 'tr', function() {
		var row = $(this);
		var color = row.css('background-color');
		row.fadeOut(400).fadeIn(400).css('background-color', 'green');
		var data = [];
		$.each(row.find('td'), function() {
			data.push($(this).text());
		});
		//Index 1 , 3
		$.ajax({
			url: '/parents/apply_child',
			type: 'PUT',
			data: {
				semail: data[1],
				ssn: data[3]
			},
			success: function() {
				alert('Success!');
			},
			error: function (){
				console.log('An Error Occurred');
				alert('An Error Occurred');
			}
		});
	});
});