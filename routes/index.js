var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send("ok boss")
});

router.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'cafrotosdangghet') {
    res.send(req.query['hub.challenge']);
  }
  else res.send('Error, wrong validation token');
});

module.exports = router;
