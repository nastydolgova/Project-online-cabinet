const express = require('express');
const router = express.Router();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

// получаем отправленные данные и добавляем их в БД
router.post("/auth/sign_up", urlencodedParser, async function (req, res) {
  const pool = await require("../database").getConnectionPool();
  if(!req.body) return res.sendStatus(400);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const [rows] = await pool.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    if (rows.length > 0){
      res.sendStatus(302);
    } else {
      await pool.query("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, password]);
      res.sendStatus(200);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// получаем отправленные данные и добавляем их в БД
router.post("/auth/sign_in", urlencodedParser, async function (req, res) {
  const pool = await require("../database").getConnectionPool();
  if(!req.body) return res.sendStatus(400);
  const email = req.body.email;
  const password = req.body.password;
  try {
    const [rows] = await pool.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    if (rows.length > 0){
      const user = rows[0];
      if (user.password === password){
        res.sendStatus(200);
      }
      else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }

  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = router;
