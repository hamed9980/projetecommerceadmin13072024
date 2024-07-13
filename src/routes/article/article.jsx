
import { Form, useLoaderData,useFetcher } from "react-router-dom";
import {useEffect,useState} from 'react';
import { getarticle, updatearticle } from "./articles";
import axios, {isCancel, AxiosError} from 'axios';

 
export async function action({ request, params }) {
  const formData = await request.formData();
  return updatearticle(params.articleId, {
    favorite: formData.get("favorite") === "true",
  });
}
import { useParams } from 'react-router';
export async function loader({ params }) {
  const article = await getarticle(params.articleId);
  if (!article) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { article };
}

export default function Article() {
  const [art1,setArt1]=useState([])
   const {contactId}=useParams()
 
  const [param,setParam]=useState(contactId)
 
  console.log(param)
useEffect(()=>{
 
   var body={

   }
  
  
  const handleOnSubmit = async (e) => {
   
    const {data}= await axios.post(
    'http://localhost:5000/articles', {
        method: "post",
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    setArt1(data)
  }
  if(param!=null){
    body={_id:contactId}
    
    handleOnSubmit()
  }
 

},[contactId])
    
    
  return (
    <>
    Hello
    {art1.map((article)=>{
      
      return <div id="article" key={article._id}>
    

       <div>
         <h1>
      Reference:     {article.reference}
           <Favorite article={article} />
         </h1>
 
        Designation: {article.designation  }
 <br/>
        Prix vente: {article.p_vente}
 <br/>
 Fournisseur: {article.fournisseur.map((option,index)=>{
return <div key={index}> Fournisseur {index+1}<br/>
  {Object.entries(option).map((opt,ind)=>{
  if(opt[0]!='article')
 return <div > {opt[0]} {JSON.stringify(opt[1])} </div>
 })}
i {JSON.stringify(index)}
</div>

 })
 }
 <br/>
 Images:<br/>
      {
    Array.from(article.images).map(function(e){
      let a='http://localhost:5000/files/profileimage/'+e
        return (<div key={e}><img src={a}/><br/></div>)
      })
       
    }

      <br/>

 <br/>
         <div>
           <Form action="edit"  >
             <button type="submit">Edit</button>
           </Form>
           <Form action="editf"  >
             <button type="submit">Edit Fournisseur</button>
           </Form>
           <Form action="editp"  >
             <button type="submit">Edit Fournisseur Price</button>
           </Form>
           <Form
             method="post"
             action="destroy"
             onSubmit={(event) => {
               if (
                 !confirm(
                   "Please confirm you want to delete this record."
                 )
               ) {
                 event.preventDefault();
               }
             }}
           >
             <button type="submit">Delete</button>
           </Form>
         </div>
       </div>
     </div>
    })}
    </>
  );
  
  
  }
 

 
function Favorite({ article }) {
   const fetcher = useFetcher();
   const favorite = fetcher.formData
   ? fetcher.formData.get("favorite") === "true"
   : article.favorite;
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}