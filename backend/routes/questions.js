var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'), // used for getting data from POST
    methodOverride = require('method-override'); // used for manipulating POST




// This portion must be placed before we get to our CRUD and REST.
// This is completely copy and pasted from method-override.
// Using 'use' will make sure that every requests that hits this controller
// will pass through these functions.

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));



// APTI Questions
//build the REST operations at the path = /questions/apti
//this will be accessible from http://127.0.0.1:3000/questions/apti

router.route('/apti')
//GET all apti questions
    .get(function(req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('Apti').find({}, function (err, question) {
            if (err) {
                return console.error(err);
            } else {
                //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                res.format({
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(question);
                    }
                });
            }
        });
    })

    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms


        var testID = req.body.testID;
        var ques = req.body.ques;
        var answers =  req.body.answers;
        var correct = req.body.correct;

        //call the create function for our database
        mongoose.model('Apti').create({
            testID: testID,
            ques: ques,
            answers: answers,
            correct: correct
        }, function (err, question) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                //Blob has been created
                console.log('POST creating new APTI : ' + question);
                res.format({


                    //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    // html: function(){
                    //     // If it worked, set the header so the address bar doesn't still say /adduser
                    //     res.location("blobs");
                    //     // And forward to success page
                    //     res.redirect("/blobs");
                    // },

                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(question);
                    }
                });
            }
        })
    });







// TECH Questions
//build the REST operations at the path = /questions/tech
//this will be accessible from http://127.0.0.1:3000/questions/tech

router.route('/tech')
//GET all apti questions
    .get(function(req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('Tech').find({}, function (err, question) {
            if (err) {
                return console.error(err);
            } else {
                //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                res.format({
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(question);
                    }
                });
            }
        });
    })

    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms


        var testID = req.body.testID;
        var ques = req.body.ques;
        var answers =  req.body.answers;
        var correct = req.body.correct;

        //call the create function for our database
        mongoose.model('Tech').create({
            testID: testID,
            ques: ques,
            answers: answers,
            correct: correct
        }, function (err, question) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                //Blob has been created
                console.log('POST creating new Tech: ' + question);
                res.format({


                    //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    // html: function(){
                    //     // If it worked, set the header so the address bar doesn't still say /adduser
                    //     res.location("blobs");
                    //     // And forward to success page
                    //     res.redirect("/blobs");
                    // },

                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(question);
                    }
                });
            }
        })
    });






// Psychometric Questions
//build the REST operations at the path = /questions/psycho
//this will be accessible from http://127.0.0.1:3000/questions/psycho

router.route('/psycho')
//GET all psychometric questions
    .get(function(req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('Psycho').find({}, function (err, question) {
            if (err) {
                return console.error(err);
            } else {
                //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                res.format({
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(question);
                    }
                });
            }
        });
    })

    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms


        var testID = req.body.testID;
        var ques = req.body.ques;
        var answers =  req.body.answers;
        var correct = req.body.correct;

        //call the create function for our database
        mongoose.model('Psycho').create({
            testID: testID,
            ques: ques,
            answers: answers,
            correct: correct
        }, function (err, question) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                //Blob has been created
                console.log('POST creating new Psycho: ' + question);
                res.format({

                    //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    // html: function(){
                    //     // If it worked, set the header so the address bar doesn't still say /adduser
                    //     res.location("blobs");
                    //     // And forward to success page
                    //     res.redirect("/blobs");
                    // },

                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(question);
                    }
                });
            }
        })
    });



// route middleware to validate :id
router.param('testID', function(req, res, next, id) {
    console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Tech').findById(id, function (err, blob) {
        //if it isn't found, we are going to respond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404);
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                // html: function(){
                //     next(err);
                // },
                json: function(){
                    res.json({message : err.status  + ' ' + err});
                }
            });
            //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(blob);
            // once validation is done save the new item in the req
            req.testID = id;
            // go to the next thing
            next();
        }
    });
});


// // route middleware to validate :id
//
// router.param('id', function(req, res, next, id) {
//     //console.log('validating ' + id + ' exists');
//     //find the ID in the Database
//     mongoose.model('Blob').findById(id, function (err, blob) {
//         //if it isn't found, we are going to respond with 404
//         if (err) {
//             console.log(id + ' was not found');
//             res.status(404);
//             var err = new Error('Not Found');
//             err.status = 404;
//             res.format({
//                 // html: function(){
//                 //     next(err);
//                 // },
//                 json: function(){
//                     res.json({message : err.status  + ' ' + err});
//                 }
//             });
//             //if it is found we continue on
//         } else {
//             //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
//             //console.log(blob);
//             // once validation is done save the new item in the req
//             req.id = id;
//             // go to the next thing
//             next();
//         }
//     });
// });
//


router.route('/apti/:testID')
    .get(function(req, res) {
        mongoose.model('Apti').findOne(req.testID, function (err, apti) {
            if (err) {
                console.log('GET Error: There was a problem retrieving: ' + err);
                res.status(404);
                res.send("404 error");

            } else {
                console.log('GET Retrieving ID: ' + apti.testID);
                console.log(typeof (req.testID));
                res.format({
                    // html: function(){
                    //     res.render('blobs/show', {
                    //         "blobdob" : blobdob,
                    //         "blob" : blob
                    //     });
                    // },
                    json: function(){
                        res.json(apti);
                    }
                });
            }
        });
    });










// CODING Questions
//build the REST operations at the path = /questions/code
//this will be accessible from http://127.0.0.1:3000/questions/code

router.route('/code')
//GET all psychometric questions
    .get(function(req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('Code').find({}, function (err, question) {
            if (err) {
                return console.error(err);
            } else {
                //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                res.format({
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(question);
                    }
                });
            }
        });
    })

    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var testID = req.body.testID;
        var ques = req.body.ques;
        var input =  req.body.input;
        var output = req.body.output;

        //call the create function for our database
        mongoose.model('Code').create({
            testID: testID,
            ques: ques,
            input: input,
            output: output
        }, function (err, question) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                //Blob for CODE has been created
                console.log('POST creating new Code: ' + question);
                res.format({
                    //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    // html: function(){
                    //     // If it worked, set the header so the address bar doesn't still say /adduser
                    //     res.location("blobs");
                    //     // And forward to success page
                    //     res.redirect("/blobs");
                    // },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(question);
                    }
                });
            }
        })
    });




module.exports = router;