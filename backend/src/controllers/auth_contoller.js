module.exports = {
    // register
    async sign_up(req, res) {
        const connection = await getConnection();
        const repo = connection.getRepository("user");
        const newUser = await repo.save({
            name: req.name,
            email: req.email,
            password: req.password
        });

        res.send(newUser);
    },

    // login
    async sign_in(req, res) {

    },

    // logout
    async sign_out(req, res) {

    }
}
