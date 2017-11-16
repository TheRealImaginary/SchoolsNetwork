/*STORED PROCEDURES >> return an array of two elements, first is data in JSON
QUERIES >> return and array of only one element in JSON (data)*/
var connection = require('../connection');

function db() {

	this.login = function(req, res) {
		connection.aquire(function(err, conn) {
			var username = req.body.username;
			var password = req.body.password;
			var options = req.body.options;
			if (options === 'Teacher') {
				conn.query('SELECT * FROM Employees WHERE username = ? AND password = ?', [username, password], function(err, rows) {
					conn.release();
					if (err)
						throw err;
					console.log(rows);
					if (rows && rows.length)
						res.redirect('/teachers/teachers.html');
					else
						res.sendStatus(403);
				});
			} else if (options === 'Admin') {
				conn.query('SELECT * FROM Employees WHERE username = ? AND password = ?', [username, password], function(err, rows) {
					conn.release();
					if (err)
						throw err;
					console.log(rows);
					if (rows && rows.length)
						res.redirect('/admins/admin.html');
					else
						res.sendStatus(403);
				});
			} else if (options === 'Student') {

			} else if (options === 'Parent') {
				conn.query('SELECT * FROM Parents WHERE username = ? AND password = ?', [username, password], function(err, rows) {
					conn.release();
					if (err)
						throw err;
					console.log(rows);
					if (rows && rows.length)
						res.redirect('/parents/parents.html');
					else
						res.sendStatus(403);
				});
			}
		});
	};

	this.view_all_schools = function(res) {
		connection.aquire(function(err, conn) {
			conn.query('CALL view_availble_schools()', function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	this.search_certain_school = function(req, res) {
		connection.aquire(function(err, conn) {
			var name = req.body.name || null,
				address = req.body.address || null,
				type = req.body.type || null;
			console.log(name + ' ' + address + ' ' + type);
			conn.query('CALL search_school(?,?,?)', [name, address, type], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	/*Won't Use it*/
	this.view_certain_school = function(req, res) {
		connection.aquire(function(err, conn) {
			conn.query('CALL view_certain_school(?)', [req.body.semail], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	this.view_certain_school_reviews = function(req, res) {
		connection.aquire(function(err, conn) {
			conn.query('SELECT * FROM Parents_Reviews_Schools WHERE school_email = ?', [req.body.semail], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	this.view_certain_school_announcements = function(req, res) {
		connection.aquire(function(err, conn) {
			conn.query('SELECT *, a.type AS AnnouncementType FROM Announcements a INNER JOIN Employees e ON a.admin_email = e.emp_email INNER JOIN Schools s ON e.school_email = s.email WHERE school_email = ?', [req.body.semail], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	/**********************************************************************************************/
	/*Parents*/

	this.parents_signup = function(req, res) {
		connection.aquire(function(err, conn) {
			var username = req.body.username,
				password = req.body.password,
				fname = req.body.fname,
				lname = req.body.lname,
				email = req.body.email,
				phone = req.body.phone,
				number = req.body.number,
				address = req.body.address;
			conn.query('CALL sign_up_parent(?, ?, ?, ?, ?, ?, ?, ?)', [fname, lname, email, phone, number, username, password, address], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.redirect('/parents/parents.html');
			});
		});
	};

	this.parent_apply_child = function(req, res) {
		connection.aquire(function(err, conn) {
			var ssn = req.body.ssn,
				name = req.body.name,
				bdate = req.body.birthdate,
				gender = req.body.gender,
				parent_username = req.body.parent_username,
				school_email = req.body.school_email;
			conn.query('CALL apply_to_child(?, ?, ?, ?, ?, ?)', [ssn, name, bdate, gender, parent_username, school_email], function(err, result) {
				conn.release();
				if (err)
					throw err;
				res.sendStatus(200);
				//console.log(result);
			});
		});
	};

	this.parents_view_accepted_schools = function(req, res) {
		connection.aquire(function(err, conn) {
			conn.query('CALL view_my_accepted_children(?)', [req.body.username], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.send(rows);
				console.log(rows);
			});
		});
	};

	this.parents_view_children_reports = function(req, res) {
		connection.aquire(function(err, conn) {
			conn.query('CALL view_reports(?)', [parseInt(req.body.ssn)], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.send(rows);
				console.log(rows);
			});
		});
	};

	this.parents_view_my_schools = function(req, res) {
		connection.aquire(function(err, conn) {
			conn.query('CALL view_my_schools(?)', [req.body.username], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.send(rows);
				console.log(rows);
			});
		});
	};

	this.parents_view_school_reviews = function(req, res) {
		connection.aquire(function(err, conn) {
			conn.query('CALL view_my_reviews(?)', [req.body.username], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.send(rows);
				console.log(rows);
			});
		});
	};

	this.choose_school = function(req, res) {
		connection.aquire(function(err, conn) {
			conn.query('CALL choose_schools(?, ?)', [req.body.semail, parseInt(req.body.ssn)], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.send(rows);
				console.log(rows);
			});
		});
	};

	this.parents_review_schools = function(req, res) {
		connection.aquire(function(err, conn) {
			var semail = req.body.semail,
				username = req.body.username,
				review = req.body.review;
			conn.query('CALL review_schools(?, ?, ?)', [semail, username, review], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.send(rows);
				//console.log(rows);
			});
		});
	};

	this.parents_reply_to_reports = function(req, res) {
		connection.aquire(function(err, conn) {
			var ssn = req.body.ssn,
				date = req.body.date,
				username = req.body.username,
				reply = req.body.reply;
			conn.query('CALL reply_to_reports(?, ?, ?, ?)', [reply, ssn, date, username], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	this.parents_view_teachers = function(req, res) {
		connection.aquire(function(err, conn) {
			conn.query('CALL view_overall_rating(?)', [req.body.username], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	this.parents_rating_teachers = function(req, res) {
		connection.aquire(function(err, conn) {
			var username = req.body.username,
				email = req.body.email,
				rating = parseInt(req.body.rating);
			conn.query('CALL rate_teachers(?, ?, ?)', [email, username, rating], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.send(rows);
				console.log(rows);
			});
		});
	};

	this.delete_schools_reviews = function(req, res) {
		connection.aquire(function(err, conn) {
			conn.query('CALL delete_review(?,?)', [req.body.username, req.body.semail], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.send(rows);
			});
		});
	};

	/**********************************************************************************************/
	/*Teacher*/

	this.teachers_signup = function(req, res) {
		connection.aquire(function(err, conn) {
			var fname = req.body.fname,
				mname = req.body.mname,
				lname = req.body.lname,
				bdate = req.body.bdate,
				address = req.body.address,
				yox = parseInt(req.body.yox),
				email = req.body.email,
				semail = req.body.semail,
				gender = req.body.gender;
			conn.query('CALL sign_up_Teacher(?, ?, ?, ?, ?, ?, ?, ?, ?)', [email, address, fname, mname, lname, bdate, gender, semail, yox], function(err, conn) {
				conn.release();
				if (err)
					throw err;
				res.redirect('/teachers/teachers.html');
			});
		});
	};

	this.view_courses = function(req, res) {
		connection.aquire(function(err, conn) {
			var email = req.body.email;
			conn.query('CALL get_courses_I_teach(?)', [email], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	this.post_assignments = function(req, res) {
		connection.aquire(function(err, conn) {
			var duedate = req.body.duedate,
				content = req.body.content,
				course_code = req.body.course_code,
				email = req.body.email;
			conn.query('CALL post_assignment(?,?,?,?)', [duedate, content, course_code, email], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	this.view_solution = function(req, res) {
		connection.aquire(function(err, conn) {
			var email = req.body.email;
			conn.query('CALL view_sol(?)', [email], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	this.grade_solution = function(req, res) {
		connection.aquire(function(err, conn) {
			var assignmentid = req.body.assignmentid,
				grade = req.body.grade,
				studentssn = req.body.studentssn;
			conn.query('CALL grade(?,?,?)', [assignmentid, grade, studentssn], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	this.report = function(req, res) {
		connection.aquire(function(err, conn) {
			var ssn = req.body.ssn,
				email = req.body.email,
				comments = req.body.comments;
			conn.query('CALL report_on_student(?,?,?)', [ssn, email, comments], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			})
		});
	};

	this.view_questions = function(req, res) {
		connection.aquire(function(err, conn) {
			var email = req.body.email;
			conn.query('CALL view_questions(?)', [email], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	this.answer_questions = function(req, res) {
		connection.aquire(function(err, conn) {
			var id = req.body.id,
				answer = req.body.answer;
			conn.query('CALL answer_questions(?,?)', [answer, id], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);	
				res.send(rows);
			});
		});
	};

	this.view_students = function(req, res) {
		connection.aquire(function(err, conn) {
			var email = req.body.email;
			conn.query('CALL view_students_taught(?)', [email], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	/**********************************************************************************************/

	/*Admins*/
	this.admins_view_applications = function(req, res) {
		connection.aquire(function(err, conn) {
			conn.query('SELECT * FROM Children_AppliedBy_Parents_To_School WHERE email = ?', [req.body.school_email], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	this.admins_view_unverified = function(req, res) {
		connection.aquire(function(err, conn) {
			conn.query("SELECT * FROM Teachers t INNER JOIN Employees e ON t.teacher_email = e.emp_email AND username IS NULL AND school_email = ?", [req.body.school_email], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	this.admins_reply_applications = function(req, res) {
		connection.aquire(function(err, conn) {
			var reply = req.body.options,
				ssn = req.body.ssn,
				school_email = req.body.school_email;
			conn.query('CALL reply_to_applications(?, ?, ?)', [reply, ssn, school_email], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.sendStatus(200);
			});
		});
	};

	this.admins_edit_schools = function(req, res) {
		connection.aquire(function(err, conn) {
			var old_email = req.body.old_email,
				fees = req.body.fees,
				phone = req.body.phone,
				type = req.body.type,
				new_email = req.body.new_email,
				main_language = req.body.main_language,
				mission = req.body.mission,
				vision = req.body.vision,
				general_info = req.body.general_info,
				name = req.body.name,
				address = req.body.address;
			conn.query('CALL edit_schools(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [old_email, new_email, mission, vision, general_info, name, address, fees, phone, type, main_language], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.sendStatus(200);
			});
		});
	};

	this.admins_create_activities = function(req, res) {
		connection.aquire(function(err, conn) {
			var date = req.body.date,
				location = req.body.location,
				description = req.body.description,
				type = req.body.type,
				equipment = req.body.equipment,
				teacher_email = req.body.teacher_email,
				admin_email = req.body.admin_email;
			conn.query('CALL create_activity(?, ?, ?, ?, ?, ?, ?)', [equipment, type, date, location, description, admin_email, teacher_email], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.sendStatus(200);
			});
		});
	};

	this.admins_changes_teacher_activity = function(req, res) {
		connection.aquire(function(err, conn) {
			var admin_email = req.body.admin_email,
				activity_id = req.body.activity_id,
				teacher_email = req.body.teacher_email;
			conn.query('CALL change_teacher_of_activity(?, ?, ?)', [teacher_email, admin_email, activity_id], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.sendStatus(200);
			});
		});
	};

	this.admins_post_announcments = function(req, res) {
		connection.aquire(function(err, conn) {
			var date = req.body.date,
				title = req.body.title,
				description = req.body.description,
				type = req.body.type,
				admin_email = req.body.admin_email;
			conn.query('CALL post_announcements(?, ?, ?, ?, ?)', [admin_email, date, title, description, type], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.sendStatus(200);
			});
		});
	}

	this.admins_assign_teacher_course = function(req, res) {
		connection.aquire(function(err, conn) {
			var teacher_email = req.body.teacher_email,
				cid = req.body.cid;
			conn.query('CALL assign_course_teacher(?, ?)', [teacher_email, cid], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.sendStatus(200);
			});
		});
	}

	this.admins_verify_teacher = function(req, res) {
		connection.aquire(function(err, conn) {
			var school_email = req.body.school_email1,
				teacher_email = req.body.teacher_email,
				username = req.body.username,
				password = req.body.password;
			conn.query('CALL verify_teacher(?, ?, ?, ?)', [username, password, teacher_email, school_email], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.sendStatus(200);
			});
		});
	}

	this.admins_view_enrolled = function(req, res) {
		connection.aquire(function(err, conn) {
			conn.query('SELECT * FROM Children c INNER JOIN Students s on c.ssn = s.ssn WHERE school_email = ?', [req.body.school_email], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				console.log(rows);
				res.send(rows);
			});
		});
	};

	this.admins_verify_student = function(req, res) {
		connection.aquire(function(err, conn) {
			var school_email = req.body.school_email,
				ssn = req.body.ssn,
				username = req.body.username,
				password = req.body.password;
			conn.query('CALL verify_student (?, ?, ?, ?)', [username, password, school_email, ssn], function(err, rows) {
				conn.release();
				if (err)
					throw err;
				res.sendStatus(200);
			});
		});
	}
};

module.exports = new db();