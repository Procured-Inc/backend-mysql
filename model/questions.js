var mongoose = require('mongoose');

var aptiSchema = new mongoose.Schema({
    testID: String,
    ques: String,
    answers: [String, String, String, String],
    correct: String
});

var techSchema = new mongoose.Schema({
    testID: String,
    ques: String,
    answers: [String, String, String, String],
    correct: String
});


var psychoSchema = new mongoose.Schema({
    testID: String,
    ques: String,
    answers: [String, String, String, String],
    correct: String
});


var codeSchema = new mongoose.Schema({
    testID: String,
    ques: String,
    input: [String, String, String, String],
    output: [String, String, String, String]
});


mongoose.model('Apti', aptiSchema);
mongoose.model('Tech', techSchema);
mongoose.model('Psycho', psychoSchema);
mongoose.model('Code', codeSchema);