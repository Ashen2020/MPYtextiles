var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var userSchema = new Schema({
 
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});
 
module.exports = mongoose.model('products', userSchema);