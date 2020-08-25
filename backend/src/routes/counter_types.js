const express = require('express');
const router = express.Router();
const authenticateJWT = require("../middlewares/authenticateJWT");
require('dotenv').config();

router.get('/', authenticateJWT, async (req, res) => {
        const pool = await require("../database/database").getConnectionPool();
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM counter_types',
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
        const pool = await require("../database/database").getConnectionPool();
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM counter_types WHERE id = ?',
                [id]
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


module.exports = router;