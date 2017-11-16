var db = require('../model/db');

module.exports = {
	configure: function(app) {

		app.post('/login', function(req, res) {
			console.log('SOMEONE TRYING TO LOGIN');
			//console.log(req);
			db.login(req, res);
		});

		app.get('/view_all_schools', function(req, res) {
			db.view_all_schools(res);
		});

		app.post('/search', function(req, res) {
			console.log('SOMEONE SEARCHING');
			db.search_certain_school(req, res);
		});

		/*Won't Use it*/
		app.post('/view_certain_school', function(req, res) {
			console.log('VIEWING CERTAIN SCHOOL');
			db.view_certain_school(req, res);
		});

		app.post('/view_certain_school_reviews', function(req, res) {
			console.log('VIEWING CERTAIN SCHOOL REVIEWS');
			db.view_certain_school_reviews(req, res);
		});

		app.post('/view_certain_school_announcements', function(req, res) {
			console.log('VIEWING CERTAIN SCHOOL ANNOUNCEMENTS');
			db.view_certain_school_announcements(req, res);
		});
		/******************************************************************/

		/*Parents*/

		app.post('/parents/signup', function(req, res) {
			db.parents_signup(req, res);
		});

		app.post('/parents/apply_child', function(req, res) {
			console.log('A PARENT APPLIED IS APPLYING TO A CHILD');
			db.parent_apply_child(req, res);
			//console.log(req);
		});

		app.post('/parents/view_accepted_schools', function(req, res) {
			console.log('VIEWING SCHOOLS THAT ACCEPTED A CHILD');
			console.log(req.body);
			db.parents_view_accepted_schools(req, res);
		});

		app.post('/parents/view_child_reports', function(req, res) {
			console.log('VIEW CHILDREN REPORTS');
			console.log(req.body);
			db.parents_view_children_reports(req, res);
		});

		app.post('/parents/view_my_schools', function(req, res) {
			console.log('Parent Viewing His Children Schools');
			console.log(req);
			db.parents_view_my_schools(req, res);
		});

		app.post('/parents/view_school_reviews', function(req, res) {
			console.log('Parent Viewing His Reviews');
			console.log(req);
			db.parents_view_school_reviews(req, res);
		});

		app.post('/parents/review_schools', function(req, res) {
			console.log('Parent Reviews School');
			// console.log(req);
			db.parents_review_schools(req, res);
		});

		app.post('/parents/reply_to_reports', function(req, res) {
			console.log('Parents Reply To Reports');
			console.log(req.body);
			db.parents_reply_to_reports(req, res);
		});

		app.post('/parents/view_teachers', function(req, res) {
			console.log('Parents View Teachers');
			db.parents_view_teachers(req, res);
		});

		app.post('/parents/rate_teachers', function(req, res) {
			console.log('Parent Rating Teacher');
			db.parents_rating_teachers(req, res);
		});

		app.put('/parents/apply_child', function(req, res) {
			console.log('Parent Choosing A School');
			db.choose_school(req, res);
		});

		app.delete('/parents/delete_schools_reviews', function(req, res) {
			db.delete_schools_reviews(req, res);
		});

		/******************************************************************/

		/*Teachers*/

		app.post('/teachers/signup', function(req, res) {
			db.teachers_signup(req, res);
		});

		app.post('/teachers/view_courses', function(req, res) {
			console.log('TEACHER VIEWING COURSES');
			db.view_courses(req, res);
		});

		app.post('/teachers/post_assignment', function(req, res) {
			console.log('TEACHER POSTING ASSIGNMENTS');
			db.post_assignments(req, res);
		});

		app.post('/teachers/view_assignments', function(req, res) {
			console.log('TEACHER VIEWING ASSIGNMENTS');
			db.view_solution(req, res);
		});

		app.post('/teachers/report', function(req, res) {
			console.log('TEACHER WRITING REPORTS');
			db.report(req, res);
		});

		app.post('/teachers/view_questions', function(req, res) {
			console.log('TEACHER VIEWING QUESTIONS');
			db.view_questions(req, res);
		});

		app.post('/teachers/answer_questions', function(req, res) {
			console.log('TEACHER ANSWERING QUESTIONS');
			db.answer_questions(req, res);
		});

		app.post('/teachers/view_students', function(req, res) {
			console.log('TEACHER VIEWING STUDENTS');
			db.view_students(req, res);
		});

		/******************************************************************/

		/*Admins*/

		app.post('/admins/view_applications', function(req, res) {
			console.log('Admin Viewing Applications');
			console.log(req.body)
			db.admins_view_applications(req, res);
		});

		app.post('/admins/view_unverified', function(req, res) {
			console.log('Admin Viewing Unverified');
			console.log(req.body.school_email);
			db.admins_view_unverified(req, res);
		});

		app.post('/admins/edit_school', function(req, res) {
			console.log('Admin Editing Schools');
			db.admins_edit_schools(req, res);
		});

		app.post('/admins/create_activity', function(req, res) {
			console.log('Admin Creating Activity');
			db.admins_create_activities(req, res);
		});

		app.post('/admins/assign_teacher_activity', function(req, res) {
			console.log('Admin Changing Teacher Of Activity');
			db.admins_changes_teacher_activity(req, res);
		});

		app.post('/admins/post_announcements', function(req, res) {
			console.log('Admin Posting Announcments');
			db.admins_post_announcments(req, res);
		});

		app.post('/admins/assign_teacher_course', function(req, res) {
			console.log('Admin Assigning Teacher To Course');
			db.admins_assign_teacher_course(req, res);
		});

		app.post('/admins/reply_applications', function(req, res) {
			console.log('Admin Replying To Applications');
			console.log(req.body);
			db.admins_reply_applications(req, res);
		});

		app.post('/admins/verify_teacher', function(req, res) {
			console.log('Admin Verifing Teacher');
			db.admins_verify_teacher(req, res);
		});

		app.post('/admins/view_enrolled', function(req, res) {
			console.log('Admin Viewing Students');
			db.admins_view_enrolled(req, res);
		});

		app.post('/admins/verify_student', function(req, res) {
			console.log('Admin Verifing Students');
			db.admins_verify_student(req, res);
		});
	}
};