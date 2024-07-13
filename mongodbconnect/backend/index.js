// Code  for mongoose config in backend
// Filename - backend/index.js
 
// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'yourDB-name',
    
      
}).then(() => { 
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const UserSchema=require('./schema/userschema');
const User = mongoose.model('users', UserSchema);

User.createIndexes();
 
// For backend and express
const express = require('express');

const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 })
app.get("/", (req, resp) => {
 
    resp.send("App is Working");
    // You can check backend is working or not by 
    // entering http://loacalhost:5000
     
    // If you see App is working means
    // backend working properly
});
const {updateArticle,registerArticle,getArticleDF,getArticle,getArticleF,getArticleFP,getArticleF1,deletearticle}=require('./function/articlefunction');
app.post('/editarticle',updateArticle);
app.post('/registerarticle',registerArticle);
app.post('/articles',getArticle);
app.post('/articlesf',getArticleF);
app.post('/articlesfp',getArticleFP);
app.post('/articlesf1/:param',getArticleF1);
app.post('/articlesdf1/:param',getArticleDF);
app.post('/deletearticle',deletearticle);
const {updatePriceFournisseur,updatefournisseur,registerfournisseur,getfournisseur,deletefournisseur,

  getFournisseurDF,getFournisseurF,getFournisseurF1
}=require('./function/fournisseurfunction');
app.post('/fournisseursf',getFournisseurF);
app.post('/fournisseursupdateprice',updatePriceFournisseur);
app.post('/fournisseursf1/:param',getFournisseurF1);
app.post('/fournisseursdf1/:param',getFournisseurDF);
app.post('/editfournisseur',updatefournisseur);
app.post('/registerfournisseur',registerfournisseur);
app.post('/fournisseurs',getfournisseur);
app.post('/deletefournisseur',deletefournisseur);
const {loginuser,registeruser}=require('./function/userfunction');
// login 
app.post('/login',loginuser);
app.post("/register", registeruser);

const {filesrouter}=require('./function/gridfsfunction')

app.use('/files',filesrouter);
app.listen(5000);