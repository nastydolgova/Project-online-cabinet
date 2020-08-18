module.exports = {
    name: "User",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
            length: 255
        },
        email: {
            type: "varchar",
            length: 255
        },
        password: {
            type: "varchar",
            length: 1024
        }
    }
};