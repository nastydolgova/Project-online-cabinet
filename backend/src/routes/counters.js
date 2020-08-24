const express = require('express');
const router = express.Router();
const authenticateJWT = require("../middlewares/authenticateJWT");
require('dotenv').config();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', authenticateJWT, async (req, res) => {
        const pool = await require("../database/database").getConnectionPool();
        const user = req.user;
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM counters WHERE user_id = ?',
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

router.get('/:id', authenticateJWT, async (req, res) => {
        const id = req.params.id
        const pool = await require("../database/database").getConnectionPool();
        const user = req.user;
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM counters WHERE user_id = ? AND id = ?',
                [user.id, id]
            );
            if (rows.length > 0) {
                res.status(200);
                res.json(rows[0]);
            } else {
                res.sendStatus(404);
            }

        } catch (e){
            console.error(e);
            res.sendStatus(500);
        }
    }
);

router.post('/', [authenticateJWT, urlencodedParser], async (req, res) => {
        const pool = await require("../database/database").getConnectionPool();
        const name = req.body.name;
        const user = req.user;
        const addressId = req.body.address_id;
        const counterTypeId = req.body.counter_type_id;
        try {

            await pool.query("INSERT INTO counters (name, user_id, address_id, counter_type_id) VALUES (?,?,?,?)", [name, user.id, addressId, counterTypeId]);
            res.sendStatus(200);

        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    }
);

router.put('/:id', [authenticateJWT, urlencodedParser], async (req, res) => {
    const id = req.params.id
    const pool = await require("../database/database").getConnectionPool();
    const name = req.body.name;
    try {

        await pool.query("UPDATE counters SET name = ? WHERE id = ?", [name, id]);
        res.sendStatus(200);

    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
    const id = req.params.id
    const user = req.user;
    const pool = await require("../database/database").getConnectionPool();
    try {

        await pool.query("DELETE FROM counters WHERE id = ? AND user_id = ?", [id, user.id]);
        res.sendStatus(200);

    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

module.exports = router;