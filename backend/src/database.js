const typeorm = require("typeorm");

require('dotenv').config()

const getConnection = async () => {
    return await typeorm.createConnection({
        type: "mysql",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        synchronize: true,
        entities: [
            new typeorm.EntitySchema(require("./models/user")),
        ]
    });
}

module.exports = {
    getConnection
};