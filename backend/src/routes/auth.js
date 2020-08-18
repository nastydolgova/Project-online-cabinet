const express = require('express');
const router = express.Router();
const {sign_up} = require("../controllers/auth_contoller");

app.route('/api/users')
router.post(async function(req, res, next) {
  return await sign_up(req, res);
});

module.exports = router;
