
import { Form, useLoaderData,useFetcher } from "react-router-dom";
import {useEffect,useState} from 'react';
import { getfournisseur, updatefournisseur } from "./fournisseurs";
import axios, {isCancel, AxiosError} from 'axios';

 
export async function action({ request, params }) {
  const formData = await request.formData();
  return updatefournisseur(params.fournisseurId, {
    favorite: formData.get("favorite") === "true",
  });
}
import { useParams } from 'react-router';

export async function loader({ params }) {
  const fournisseur = await getfournisseur(params.fournisseurId);
  if (!fournisseur) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { fournisseur };
}

export default function fournisseur() {
  const [art1,setArt1]=useState([])
   const {contactId}=useParams()
 
  const [param,setParam]=useState(contactId)
 
  console.log(param)
useEffect(()=>{
 
   var body={

   }
  
  
  const handleOnSubmit = async (e) => {
   
    const {data}= await axios.post(
    'http://localhost:5000/fournisseurs', {
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
    {art1.map((fournisseur)=>{
      
      return <div id="fournisseur" key={fournisseur._id}>
    

       <div>
         <h1>
      Nom:     {fournisseur.nomfournisseur}<br/>

           <Favorite fournisseur={fournisseur} />
         </h1>
        Nomenclature : {fournisseur.nomenclature}<br/>
        
        Contact: {fournisseur.contact  }<br/>
 <br/>
        Tel: {fournisseur.tel}<br/>
 <br/>
 Article: {fournisseur.article.map((opt,ind)=>{
  
  return <div key={ind}>
    Article {ind+1} <br/>
    {Object.entries(opt).map((op,_in)=>{
      if(op[0]!='fournisseur')
      return <div key={_in}>{op[0]} {op[1]}</div>
    })}</div>
 })}<br/>
 <br/>
  

 <br/>
         <div>
           <Form action="edit"  >
             <button type="submit">Edit</button>
           </Form>
           <Form action="edita">
            <button type="submit">Edit Article</button>
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
 

 
function Favorite({ fournisseur }) {
   const fetcher = useFetcher();
   const favorite = fetcher.formData
   ? fetcher.formData.get("favorite") === "true"
   : fournisseur.favorite;
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