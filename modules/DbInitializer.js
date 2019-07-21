// db connection
const mysql = require('mysql');
const env = require('../env.host.json');

class DbInitializer {
    constructor() {
        this.connection = mysql.createConnection(env["DB_CONFIG"]);
        this.connection.connect();
    }
}

module.exports = DbInitializer;