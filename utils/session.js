const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'eshop'
};



module.exports = new MySQLStore(options);