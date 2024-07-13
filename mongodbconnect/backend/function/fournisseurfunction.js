const mongoose = require('mongoose');
const ArticleFournisseurSchema=require('../schema/articlefournisseurschema');
const fournisseurSchema=require('../schema/fournisseurschema');
const fournisseur=mongoose.model('fournisseur',fournisseurSchema);
const updatePriceFournisseur=async(req,res)=>{
    const formData=req.body.body
    var prices=[]
    var fournisseurs=[]
    var articlesY=[]
    Object.entries(formData).map((e,i)=>{
        
      if(e[0].startsWith('price')){
        prices.push(e[1])
      }
      else if(e[0].startsWith('fournisseur')){
        fournisseurs.push(e[1])
      }
      else if(e[0].startsWith('article')){
      
        articlesY.push(e[1])
      }
    })
    
     articlesY.map(async (e,i)=>{
        var r=JSON.stringify({fournisseur:fournisseurs[i],article:e})
        console.log('Updating')
        console.log(r)

        const res=await ArticleFournisseurSchema.findOneAndUpdate({articlefournisseur:r},
            {$set:{price:prices[i]}},{new:true}
        )
        console.log(res)
    })
    

    console.log(prices,fournisseurs,articlesY)
    res.send([])
}


const getFournisseurF1=async(req,res)=>{
    console.log('Ajout association fournisseur article')
    let f=Object.values(req.body.body).map(e=>{
      
        let x= {article:e._id,fournisseur:req.params.param,

            articlefournisseur:JSON.stringify({fournisseur:req.params.param,article:e._id})
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
const getFournisseurF=async(req,res)=>{
    console.log('Get articles fournisseur from database')
    if(req.body.body){
        
        ArticleFournisseurSchema.find({fournisseur:req.body.body._id}).populate(
            
           {path: "article",

            
           }).select('article').then((d)=>{
            console.log(d)
            d=d.filter(e=>e.article!=null).map(e=>e.article)
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

const getFournisseurDF=async(req,res)=>{
    console.log('Remove articles fournisseur from database')
    
    let f=Object.values(req.body.body).map(e=>{
       
        let x= {article:e._id,fournisseur:req.params.param,

            articlefournisseur:JSON.stringify({fournisseur:req.params.param,article:e._id})
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



const getfournisseur=async(req,res)=>{
    console.log('Getting fournisseurs')
   
   
   if(req.body.body==="{}") req.body.body={}
   if(req.body.body)
     
    try{
     await fournisseur.find(req.body.body).then((d)=>{
        
        res.send(d)
    }).catch((e)=>{
        console.log("exception lecture fournisseur")
        res.send([])
    });
          
    }catch(ex){
        console.log(ex)
        res.send([])
    }
    else res.send([])
}
 
 
const updatefournisseur=async (req,resp)=>{
    console.log('Updating fournisseur')
    console.log(req.body)
   if(req.body.body.article!=undefined) req.body.body.article=JSON.parse(req.body.body.article)
    if(req.body)
    try{
    
        fournisseur.findByIdAndUpdate(req.body.body._id,req.body.body, {new: true,upsert :true}).then(function(docs){
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

const registerfournisseur=async (req,resp)=>{
    console.log(req.body)
   
try{
    const fournisseur=new fournisseur(req.body);
    fournisseur.save()
}   catch (e) {
    console.log(e)
    resp.send("Something Went Wrong");
}
}
const deletefournisseur=async function(req,resp){
    console.log('Delete fournisseur')
    console.log(req.body)
    console.log(req.body.body._id)
    if(req.body.body._id)
        fournisseur.findByIdAndDelete(req.body.body._id).then((doc)=>{
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
    getfournisseur,registerfournisseur,deletefournisseur,updatefournisseur,
    getFournisseurF
    ,getFournisseurDF
    ,getFournisseurF1,
    updatePriceFournisseur

}