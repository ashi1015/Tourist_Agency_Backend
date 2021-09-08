const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const TouristSchema = new mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    country: {
        type: String
    },
    noOfAdultTravellers: {
        type: String
    },
    noOfChildTravellers: {
        type: String
    },
    date: {
        type: String
    },
    password: {
        type: String
    },
    image: {
        type: String
    }
},
{ timestamps: true });

module.exports = mongoose.model('tourists', TouristSchema);

