const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
name: {
type:String,
required:true
},
poType:{
type:String,
required:true,
},
offense:{
type:String,
required:true,
},
defense:{
type:String,
required:true
}
}
,{
timestamps : true
});

var Pokemons = mongoose.model('Pokemon',pokemonSchema);

module.exports = Pokemons;
