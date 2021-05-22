var express = require('express');
var router = express.Router();

router.get('/about', (req, res) => {
  res.send('About birds');
});

module.exports = router;