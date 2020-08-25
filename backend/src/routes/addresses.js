const express = require('express');
const authenticateJWT = require("../middlewares/authenticateJWT");
const router = express.Router();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const addressValidation = require("../middlewares/addresses_validation");

router.get('/', authenticateJWT, async (req, res) => {
        const pool = await require("../database/database").getConnectionPool();
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

router.get('/:id', authenticateJWT, async (req, res) => {
        const id = req.params.id
        const pool = await require("../database/database").getConnectionPool();
        const user = req.user;
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM addresses WHERE user_id = ? AND id = ?',
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

router.post('/', [authenticateJWT, urlencodedParser, addressValidation], async (req, res) => {
        const pool = await require("../database/database").getConnectionPool();
        const user = req.user;
        const address = req.body.address;
        const apartments = req.body.apartments;
        const fias = req.body.fias_code;
        try {
            await pool.query(
                "INSERT INTO addresses (user_id, address, apartments, fias_code) " +
                    "VALUES (?,?,?,?)",
                [user.id, address, apartments, fias]);

            const [rows] = await pool.query("SELECT LAST_INSERT_ID() AS newId");
            const id = rows[0].newId;

            const [addressesRows] = await pool.execute(
                'SELECT * FROM addresses WHERE id = ?',
                [id]
            );

            res.status(200).json(addressesRows[0]);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    }
);

router.put('/:id', [authenticateJWT, urlencodedParser, addressValidation], async (req, res) => {
    const id = req.params.id
    const pool = await require("../database/database").getConnectionPool();
    const address = req.body.address;
    const apartments = req.body.apartments;
    const fias = req.body.fias_code;
    try {

        await pool.query(
            "UPDATE addresses SET address = ?, apartments = ?, fias_code = ? WHERE id = ?",
            [address, apartments, fias, id]
        );

        const [rows] = await pool.execute(
            'SELECT * FROM addresses WHERE id = ?',
            [id]
        );

        res.status(200).json(rows[0]);
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

        await pool.query("DELETE FROM addresses WHERE id = ? AND user_id = ?", [id, user.id]);
        res.sendStatus(200);

    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});




module.exports = router;