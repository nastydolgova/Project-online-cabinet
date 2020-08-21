const mysql2 = require("mysql2/promise");

require('dotenv').config();

const getConnection = async () => {
    return mysql2.createPool({
        connectionLimit: 5,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
    });
}

module.exports = {
    getConnectionPool: getConnection
};