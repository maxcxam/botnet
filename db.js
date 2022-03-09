const { mongoose, Schema } = require('mongoose');

mongoose.connect('mongodb://localhost:27017/uri');

const uriSchema = new Schema({
    uri:  String,
    title: String
});

const Uri = mongoose.model('Uri', uriSchema);

exports.getAllUris = () => {
    return Uri.find({});
};

//add Uri or Uri[]
exports.addUri = uri => {
    return Uri.create(uri);
};

exports.removeUri = uri => {
    return Uri.deleteOne({ uri });
};

exports.removeAllUris = () => {
    return Uri.deleteMany({});
};
