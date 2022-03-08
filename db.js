const { mongoose, Schema } = require('mongoose');

mongoose.connect('mongodb://localhost:27017/uri');

const uriSchema = new Schema({
    uri:  String,
    title: String
});

exports.uri = mongoose.model('Uri', uriSchema);
