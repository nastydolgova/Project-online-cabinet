const express = require('express');
const authenticateJWT = require("../middlewares/authenticateJWT");
const router = express.Router();
require('dotenv').config();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', authenticateJWT, async (req, res) => {
        const pool = await require("../database").getConnectionPool();
        const user = req.user;
        try {
            const [rows] = await pool.execute(
                'SELECT cv.*\n' +
                'FROM counter_values cv\n' +
                'INNER JOIN counters c ON cv.counter_id = c.id AND c.user_id = ?\n',
                [user.id],
                []
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
        const pool = await require("../database").getConnectionPool();
        const user = req.user;
        try {
            const [rows] = await pool.execute(
                'SELECT cv.*\n' +
                'FROM counter_values cv\n' +
                'INNER JOIN counters c ON cv.counter_id = c.id AND c.user_id = ?\n' +
                'WHERE cv.id = ?\n',
                [user.id, id ]
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
        const pool = await require("../database").getConnectionPool();
        const counterId = req.body.counter_id;
        const registryTime = req.body.registry_time;
        const value = req.body.value;
        const user = req.user;
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM counters WHERE user_id = ? AND id = ?',
                [user.id, counterId]
            );

            if (rows.length > 0){
                await pool.query(
                    "INSERT INTO counter_values (counter_id, registry_time, value) " +
                    "VALUES (?,?,?)",
                    [ counterId, registryTime, value]);
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }

        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    }
);
router.put('/:id', [authenticateJWT, urlencodedParser], async (req, res) => {
    const id = req.params.id
    const pool = await require("../database").getConnectionPool();
    const counterId = req.body.counter_id;
    const registryTime = req.body.registry_time;
    const value = req.body.value;
    const user = req.user;
    try {

        await pool.query(
            "UPDATE counter_values\n" +
            "SET counter_id = ?,\n" +
            " registry_time = ?,\n" +
            " value = ?\n" +
            " WHERE id = ? AND counter_id IN (SELECT id FROM counters WHERE user_id = ?)",
            [counterId, registryTime, value, id, user.id]
        );
        res.sendStatus(200);

    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
    const id = req.params.id
    const user = req.user;
    const pool = await require("../database").getConnectionPool();
    try {

        await pool.query("DELETE FROM counter_values\n" +
            "WHERE id = ? AND counter_id IN (SELECT id FROM counters WHERE user_id = ?)",
            [id, user.id]);
        res.sendStatus(200);

    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

module.exports = router;