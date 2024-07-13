const mongoose = require('mongoose');
const FournisseurSchema=new mongoose.Schema({
    nomfournisseur:{
        type:String,
    },
    nomenclature:{
        type:String,
    },
    contact:{
        type:String,
    },
    tel:{
        type:String,
    },
    article:{
        type:Array,
        default:[]
    }

 });

 module.exports=FournisseurSchema;
 