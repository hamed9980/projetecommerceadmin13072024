const mongoose = require('mongoose');
const ArticleSchema=require('../schema/articleschema');
const ArticleFournisseurSchema=require('../schema/articlefournisseurschema');
const Article=mongoose.model('article',ArticleSchema);
const getArticleF1=async(req,res)=>{
    console.log('Ajout association fournisseur article')
    let f=Object.values(req.body.body).map(e=>{
      
        let x= {fournisseur:e._id,article:req.params.param,

            articlefournisseur:JSON.stringify({fournisseur:e._id,article:req.params.param})
        }
        return x
            

        }
 )
 f=Array.from(f)

ArticleFournisseurSchema.insertMany(f, { ordered: false }).then((insertedRecords) => {
    console.log('Successfully inserted records:', insertedRecords);
})
.catch((error) => {
    console.error('Error inserting records:',error);
});
    console.log(f)
    res.send([])
}
const getArticleF=async(req,res)=>{
    console.log('Get articles fournisseur from database')
    if(req.body.body){
        
        ArticleFournisseurSchema.find({article:req.body.body._id}).populate(
            
           {path: "fournisseur",

            
           }).select('fournisseur').then((d)=>{
            console.log(d)
            d=d.filter(e=>e.fournisseur!=null).map(e=>e.fournisseur)
        res.send(d)
    }).catch((e)=>{
        console.log('not found')
        res.send([])
    });
    }
    else{
    res.send([])
    }
}
const getArticleFP=async(req,res)=>{
    console.log('Get articles fournisseur from database V2')
    if(req.body.body){
        
        ArticleFournisseurSchema.find({article:req.body.body._id}).populate(
            
           {path: "fournisseur",

            
           }).select('fournisseur price').then((d)=>{
             
            e1=d.filter(e=>e.fournisseur!=null).map(e=>e.fournisseur)
            e2=d.filter(e=>e.fournisseur!=null).map(e=>e.price)
             
        res.send([e1,e2])
    }).catch((e)=>{
        console.log('not found')
        res.send([])
    });
    }
    else{
    res.send([])
    }
}
const getArticleDF=async(req,res)=>{
    console.log('Remove articles fournisseur from database')
    
    let f=Object.values(req.body.body).map(e=>{
       
        let x= {fournisseur:e._id,article:req.params.param,

            articlefournisseur:JSON.stringify({fournisseur:e._id,article:req.params.param})
        }
        return x
            

        }
 )
 f=Array.from(f)
 f=f.map(f=>f.articlefournisseur)

 f=Object.values(f)
  
 ArticleFournisseurSchema.deleteMany({articlefournisseur:f}).then((insertedRecords) => {
    console.log('Successfully inserted records:', insertedRecords);
})
.catch((error) => {
    console.error('Error inserting records:',error);
});
    console.log(f)
    res.send([]) 
}
const getArticle=async(req,res)=>{
    console.log('Getting articles')
   
   
   if(req.body.body==="{}") req.body.body={}
   if(req.body.body)
     
    try{
     await Article.find(req.body.body).then((d)=>{
        
        res.send(d)
    }).catch((e)=>{
        console.log("exception lecture article")
        res.send([])
    });
          
    }catch(ex){
        console.log(ex)
        res.send([])
    }
    else res.send([])
}
 
 
const updateArticle=async (req,resp)=>{
    console.log('Updating article')
    console.log(req.body)
    console.log('48')
    if(req.body)
    try{
    
        

     
        Article.findByIdAndUpdate(req.body.body._id,req.body.body, {new: true,upsert :true}).then(function(docs){
            console.log("docs")
            console.log(docs)
            resp.send(docs)
        }).catch(function(err){
            console.log("erreur update")
            
            resp.send(err)
        })
    }catch(ex){
        console.log(ex)
    }
    else
    resp.send([])
}

const registerArticle=async (req,resp)=>{
    console.log(req.body)
   
try{
    const article=new Article(req.body);
    article.save()
}   catch (e) {
    console.log(e)
    resp.send("Something Went Wrong");
}
}
const deletearticle=async function(req,resp){
    console.log('Delete')
    console.log(req.body)
    if(req.body.body._id)
        Article.findByIdAndDelete(req.body.body._id).then((doc)=>{
            resp.send(doc)
        }).catch((err)=>{
            console.log('erreur suppression')
            resp.send([])
        })
        else{
            resp.send([])
        }
}

module.exports={
    getArticle,registerArticle,deletearticle,updateArticle,getArticleF
    ,getArticleDF
    ,getArticleF1,
    getArticleFP
}