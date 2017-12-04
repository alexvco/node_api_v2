const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// GeoJSON Example
// {
//   "type": "Feature",
//   "geometry": {
//     "type": "Point",
//     "coordinates": [125.6, 10.1]
//   },
//   "properties": {
//     "name": "Dinagat Islands"
//   }
// }

// create geolocation Schema
const GeoSchema = new Schema({
    type: { // this is the attribute named type
        type: String, // this is the type of attribute aka String, Number, Boolean
        default: 'Point' //from GeoJSON
    },
    coordinates: {
        type: [Number],
        index: '2dsphere' // from GeoJSON
    }
});


// create ninja Schema & model, note that by creating this schema essentially you are making the following the permitted params. So that when i try to create a new document with extra params such as {"hav": "havgit"} it will be ignored
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false // when creating a new ninja, if they dont specify the available attribute, default this value to false
    },
    geometry: GeoSchema // instead of creating GeoSchema we could have inserted type and coordinates here directly, but this is neater
});

const Ninja = mongoose.model('ninja', NinjaSchema); // this line creates a new Ninja model. const Ninja is like the class of our model, mongoose.model('ninja') will be pluralized and be the name of our collection

module.exports = Ninja; // we export this Ninja model so we can use it in other files, kind of like ruby class inheritance of activerecord.