const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
});

const Ninja = mongoose.model('ninja', NinjaSchema); // this line creates a new Ninja model. const Ninja is like the class of our model, mongoose.model('ninja') will be pluralized and be the name of our collection

module.exports = Ninja; // we export this Ninja model so we can use it in other files, kind of like ruby class inheritance of activerecord.