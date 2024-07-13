const mongoose = require('mongoose');
const ArticleSchema=new mongoose.Schema({
    images:{
        type:Array,
        default:[]
    },
    reference:{
        type:String,
    },
    designation:{
        type:String,
    },
    p_vente:{
        type:String,
    },
    fournisseur:{
        type:Array,
        default:[]
    },
    description:{
        type:String
    },

 });

module.exports=ArticleSchema;
 