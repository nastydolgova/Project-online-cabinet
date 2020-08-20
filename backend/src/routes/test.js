

const express = require('express');
const authenticateJWT = require("../middlewares/authenticateJWT");
const router = express.Router();

router.get('/test', authenticateJWT, (req, res) => {
    res.json({result:"ok"});
});

module.exports = router;