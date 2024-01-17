const mongoose = require('mongoose');
const collection = 'url';
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        require: true,
        unique: true
    },
    longUrl: {
        type: String,
        require: true
    },
    visitHistory: [{ timeStamp: { type: Number } }]
},
    { timestamps: true });

const URL = mongoose.model(collection, urlSchema);

module.exports = URL;