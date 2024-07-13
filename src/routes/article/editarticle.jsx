import { Form, useLoaderData, redirect,  useNavigate, } from "react-router-dom";
import { updatearticle } from "./articles";
import {useState,useEffect} from "react"
import { useParams } from 'react-router';
import axios, {isCancel, AxiosError} from 'axios';

 


export async function action({ request, params }) {
  console.log(params)
  const formData = await request.formData();
  
 
  const updates = Object.fromEntries(formData);
  console.log(formData)
  await updatearticle(params, updates);
  
  return redirect(`/articles/articles/${updates.id}`);
}
export default function Editarticle() {
   
const {contactId}=useParams()
console.log(contactId)
const [param,setParam]=useState(contactId)
  const navigate = useNavigate();
  const [article1,setArticle1]=useState([])
  useEffect(()=>{
 
    var body={
 
    }
   
   
   const handleOnSubmit1 = async (e) => {
    
     const {data}= await axios.post(
     'http://localhost:5000/articles', {
         method: "post",
         body: body,
         headers: {
             'Content-Type': 'application/json'
         }
     });
     if(data.length>0)
     setArticle1(data[0])
     console.log(article1)
   }
   console.log(param)
   if(param!=null){
     body={_id:contactId}
     console.log(body)
     handleOnSubmit1(body)
     console.log(article1)
   }
  
 
 },[contactId])
   
  return (
    <Form method="post" id="article-form">
      <p>
        <input readOnly name="_id" value={contactId}></input>
        <span>Name</span>
        <input
          placeholder="reference"
          aria-label="reference"
          type="text"
          name="reference"
          defaultValue={article1?.reference}
        />
        <span>Designation </span>
        <input
          placeholder="designation"
          aria-label="designation"
          type="text"
          name="designation"
          defaultValue={article1?.designation}
        />
      </p>
      <label>
        <span>Prix vente</span>
        <input
          type="number"
          name="p_vente"
          placeholder="prix vente"
          defaultValue={article1?.p_vente}
        />
      </label>
       
      <label>
        <span>Description</span>
        <textarea
          name="description"
          defaultValue={article1?.description}
          rows={6}
        />
      </label>
      <label>
        <span>Photo</span>
        <input type="file" id="file" name="file" multiple></input>
      </label>
      <p>
        <button type="submit"  >Save</button>
        <button  onClick={() => {
            navigate(-1);
          }} type="button">Cancel</button>
      </p>
    </Form>
  );
}