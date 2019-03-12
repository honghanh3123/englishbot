var express = require('express');
var router = express.Router();
var request = require('request');

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

router.post("/webhook", (req, res) => {
  let data = req.body;
  console.log(data);
  let entries = data.entry;
  entries.map(entry => {
    let messages = entry.messaging;
    messages.map(message => {
      let sender = message.sender.id;
      let mess = message.message.text;
      console.log(sender, mess)
      callSendAPI(sender, mess)
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
      "access_token": "EAAdZBygDQHKYBAAyTv5MHFCIqEdOmKGaL1UFFu9Abx2bS064LGizw2mbMTZARCJPuem2xOncTzRAO90i6AyZCjkHEQ6s2Chy5Chm2ZCBuVvoUekSfDUDpZATPR0H6y2XMTa4QHewQYyVHavHKyE8KJLa18EAEHqt9AjjJdt5kCwZDZD"
    },
    method: "POST",
    json: request_body
  }, (err, res, body) => {
    if (!err) {
      console.log(body)
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

callSendAPI(2714751901898747, "Hanh cafrotos")

// module.exports = router;
