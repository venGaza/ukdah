var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
require('dotenv').config();

// Checks if an object is empty
function isEmpty (obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/* GET lost password page. */
router.get('/', function(req, res, next) {
    var context = {};
    context.title = 'Ukdah |  Employee recognition portal';
    context.header = "alt";
    res.render('lostPassword', context);
  });

// Check for account email and send password if it exists
router.post('/', function(req, res) {
    var sqlite3 = req.app.get('sqlite3');
    var context = {};

	// email query
    let query = `SELECT fname AS name, userPass \
                 FROM user \
                 WHERE email=?`;
    let inserts = req.body.email;

	console.log(query);

	sqlite3.db.all(query, inserts, (errors, results) => {
		if (errors) {
			throw errors;
        } else if (isEmpty(results)) {
            console.log("Email not found");
            context.error = "Email does not exist";
        	res.render('lostPassword', context);
        } else {
            // Email password to user's email address
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            userName = results[0].name;
            userPass = results[0].userPass;

            const mailOptions = {
                from: 'Ukdah Employee Recognition', // sender address
                to: inserts, // list of receivers
                subject: 'Ukdah Account: Lost Password', // Subject line
                html: `${userName}, <br><br> Here is your password for Ukdah. Next time a $5 surcharge will be assessed! <br><br>\
                    PASSWORD : ${userPass} <br><br>\
                    If you did not make this request, please email the Ukdah team. <br><br>\
                    Best Regards <br><br>\
                    The Ukdah Team <br>\
                    1234 Someplace, Somewhere 19087<br>\
                    (123) 456-7890`// plain text body
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                  console.log(err)
                else
                  console.log(info);
            });
            
            // Reload lost password page with confirmation
            context.confirmation = "An email with the account password has been sent!";
            res.render('lostPassword', context);
        }
	});
});

module.exports = router;