var express = require('express');
var router = express.Router();

var Client = require('instagram-private-api').V1;
var device = "";
var storage = new Client.CookieFileStorage(__dirname + '/cookies/someuser.json');
//var cpath = '~/Library/Application\ Support/Google/Chrome/Default/'
//var storage = new Client.CookieFileStorage(cpath + 'cookies/someuser.json');


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
	res.sendFile(path.join(__dirname + '/index.html'));
});

router.post('/sendMessage', function(req, res) {
	console.log('send message.');
	content = ""

	fromid = req.body.fromid;
	frompw = req.body.frompw;
	toid = req.body.toid;
	msg = req.body.msg;

	content += "<html> sending message from " + fromid + " to " + toid + "<br><br>"

	device = new Client.Device(fromid);
	Client.Session.create(device, storage, fromid, frompw)
    .then(function(session) {
        var accountId = storage.getAccountId() .then(function(accountId){ console.log(accountId); return 
        accountId;});
        var feed = new Client.Feed.Inbox(session, accountId);
        feed.get()
            .then(function(results) {
                return results[0].items;
            })
            .then(function (items) {
                console.log(items[0]._params.text);
            })
    });

	// Client.Session.create(device, storage, fromid, frompw)
	// .then(function(session) {
	//  	return [session, Client.Account.searchForUser(session, toid)];
	//  })
	//  .spread(function(session, account) {
	//  	//return Client.Relationship.create(session, account.id);
	//  	//return Client.Thread.configureText(session, account.id, msg);
	//  })
	//  .then(function(obj) {
	//  	//console.log(relationship.params)
	//  	console.log(obj)
	//  	content += "sent<br><br>";
	//  	content += "<a href='../'>Back</a>"
	//  	content += "</html>"
	//  	res.set('Content-Type', 'text/html');
	//  	res.send(new Buffer(content));
	//  })

});

module.exports = router;
