var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).send("ok boss")
});

router.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'cafrotosdangghet') {
    res.send(req.query['hub.challenge']);
  }
  else res.send('Error, wrong validation token');
});

router.post("/webhook", (req, res) => {
  let data = req.body;
  console.log(data);
  let entries = data.entry;
  entries.map(entry => {
    let messages = entry.messaging;
    messages.map(message => {
      let sender = message.sender.id;
      let mess = message.message.text;
      db.tbl_edict.findOne({ where: { word: mess } })
        .then(word => {
          callSendAPI(sender, word.dataValues.detail);
        })
        .catch(err => {
          console.log(err);
        })
      // callSendAPI(sender, mess)
    })
  })
  res.status(200).send('ok')
})

function callSendAPI(sender_psid, message) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": {
      "text": message
    }
  }

  // Send the HTTP request to the Messenger Platform
  request({
    uri: "https://graph.facebook.com/v2.6/me/messages",
    qs: {
      "access_token": "EAAdZBygDQHKYBAF55jpGIRL6xGAbjvmtqvcVHAFuhhCvtKV5xoUoIBJpaJ3TdtRSux6BZCGYmV2Ioml9CCzsWEshdhlGQl2Pj9w50mlMtZBsv75jQnJdh3ci5Jd1qFhXU5bDtZC2oX9CbWFZBZAL3NL9pYwVGuG1KPkrjAagkeYwZDZD"
    },
    method: "POST",
    json: request_body
  }, (err, res, body) => {
    if (!err) {
      console.log("Response from facebook: ", body)
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

// callSendAPI(2714751901898747, "Hanh cafrotos")

module.exports = router;
