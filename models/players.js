const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PlayerSchema = new Schema( {
    name:{
        type:String,
        required : true
    },
    age : {
        type: Number,
    },
    level : {
        type: Number
    }
} ,
{timestamps : true}

);


var Players = mongoose.model('Player', PlayerSchema);

module.exports = Players;