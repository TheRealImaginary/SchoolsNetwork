var mysql = require('mysql');

function Connection() {

	this.pool = mysql.createPool({
		connectionLimit: 10,
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'Schools_Network_Test'
	});

	this.aquire = function(callback) {
		this.pool.getConnection(function(err, conn) {
			callback(err, conn);
		});
	};
};

module.exports = new Connection();
