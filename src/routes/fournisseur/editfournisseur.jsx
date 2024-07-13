import { Form, useLoaderData, redirect,  useNavigate, useNavigation,useSubmit} from "react-router-dom";
import { updatefournisseur } from "./fournisseurs";
import {useState,useEffect} from "react"
import { useParams } from 'react-router';
import axios, {isCancel, AxiosError} from 'axios';

import { getarticles, createarticle } from "../article/articles";


export async function action({ request, params }) {
  console.log(params)
  const formData = await request.formData();
  
 
  const updates = Object.fromEntries(formData);
  console.log(formData)
  await updatefournisseur(params, updates);
  
  return redirect(`/fournisseurs/fournisseurs/${updates.id}`);
}
export default function Editfournisseur() {
  const { articles,q1 } = useLoaderData();
  const [quer,setquer]=useState('')
const [articles1,setArticles1]=useState([]);
const [articles2,setArticles2]=useState([]);
 
const [checkedValues, setCheckedValues] = useState({});
const [checkedValues1, setCheckedValues1] = useState({});
const handleCheckboxChange = (event) => {
  const { name, checked } = event.target;
  setCheckedValues({ ...checkedValues, [name]: checked });
  console.log(checkedValues)
};
const handleCheckboxChange1 = (event) => {
  const { name, checked } = event.target;
  setCheckedValues1({ ...checkedValues1, [name]: checked });
  console.log(checkedValues1)
};
const handleRemoveChecked1 = () => {
  console.log(articles2,checkedValues1)
  const filteredElements = articles2.filter((element,index) => {
    console.log(index+1)
   console.log(checkedValues1['option'+(index+1)])
      return checkedValues1['option'+(index+1)]!=true;
    
  });
  setArticles2(filteredElements);
};
const doSomething = async(x) =>{
  console.log(x)
  setArticles1(await getarticles(x));
  }
  const navigation = useNavigation();
    const submit = useSubmit();
    const searching =
      navigation.location &&
      new URLSearchParams(navigation.location.search).has(
        "q1"
      );
  useEffect(() => {
    
   if(quer.length>0)
    doSomething(quer)
  else
  setArticles1([])
  }, [quer]);
 
const {contactId}=useParams()
console.log(contactId)
const [param,setParam]=useState(contactId)
  const navigate = useNavigate();
  const [fournisseur1,setfournisseur1]=useState([])
  useEffect(()=>{
 
    var body={
 
    }
   
   
   const handleOnSubmit1 = async (e) => {
    
     const {data}= await axios.post(
     'http://localhost:5000/fournisseurs', {
         method: "post",
         body: body,
         headers: {
             'Content-Type': 'application/json'
         }
     });
     if(data.length>0)
     setfournisseur1(data[0])
     console.log(fournisseur1)
   }
   console.log(param)
   if(param!=null){
     body={_id:contactId}
     console.log(body)
     handleOnSubmit1(body)
     console.log(fournisseur1)
   }
  
 
 },[contactId])
   
  return (
    <div>
      
      
   
              
    <Form method="post" id="fournisseur-form">
      
        <label>
        <span>Contact ID</span>
               <input readOnly name="_id" value={contactId}></input>
      </label>
<label>
        <span>Name</span>
        <input
          placeholder="nom"
          aria-label="nom"
          type="text"
          name="nomfournisseur"
          defaultValue={fournisseur1?.nomfournisseur}
        />
        </label>
        <label>
        <span>Nomenclature</span>
        <input
          placeholder="nomenclature"
          aria-label="nomenclature"
          type="text"
          name="nomenclature"
          defaultValue={fournisseur1?.nomenclature}
        />
        </label>
        <label> 
        <span>Contact</span>
        <input
          placeholder="contact"
          aria-label="contact"
          type="text"
          name="contact"
          defaultValue={fournisseur1?.contact}
        />
        </label>
      <label>
        <span>Téléphone</span>
        <input
          type="number"
          name="tel"
          placeholder="telephone"
          defaultValue={fournisseur1?.telephone}
        />
      </label>
      
      
 
       <p>
        <button type="submit"  >Save</button>
        <button  onClick={() => {
            navigate(-1);
          }} type="button">Cancel</button>
      </p>
    </Form>
    
    </div>
  );
}