const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ArticleFournisseurSchema=new Schema({
    article:{
        type:String,
        ref:"article"
    },
    fournisseur:{
        type:String,
        ref:"fournisseur"
    },
    articlefournisseur:{
        type:String,
         unique:true,
    },
    price:{
        type:Number,
        default:0
    }
})
 
module.exports=mongoose.model('articlefournisseurschema',ArticleFournisseurSchema);