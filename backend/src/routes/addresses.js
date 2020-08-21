const express = require('express');
const authenticateJWT = require("../middlewares/authenticateJWT");
const router = express.Router();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', authenticateJWT, async (req, res) => {
        const pool = await require("../database").getConnectionPool();
        const user = req.user;
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM addresses WHERE user_id = ?',
                [user.id]
            );

            res.status(200);
            res.json(rows);

        } catch (e){
            console.error(e);
            res.sendStatus(500);
        }
    }
);

router.post('/', [authenticateJWT, urlencodedParser], async (req, res) => {
        const pool = await require("../database").getConnectionPool();
        const user = req.user;
        const address = req.body.address;
        const apartments = req.body.apartments;
        const fias = req.body.fias_code;
        try {

            await pool.query("INSERT INTO addresses (user_id, address, apartments, fias_code) VALUES (?,?,?,?)", [user.id, address, apartments, fias]);
            res.sendStatus(200);

        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    }
);



module.exports = router;