module.exports = {
    getUserByEmail: async (email) => {
        const pool = await require("../database/database").getConnectionPool();
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        if (rows.length > 0) {
            return rows[0];
        } else {
            return undefined;
        }
    },

    createUser: async (name, email, passwordHash, number) => {
        const pool = await require("../database/database").getConnectionPool();
        await pool.query(
            "INSERT INTO users (name, email, password, phone_number) VALUES (?,?,?,?)",
            [name, email, passwordHash, number]);
    }
}