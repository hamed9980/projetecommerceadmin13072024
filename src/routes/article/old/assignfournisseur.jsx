import { Form, useLoaderData, redirect,  useNavigate, useNavigation,useSubmit} from "react-router-dom";
import { updatearticle } from "../articles";
import {useState,useEffect,useRef} from "react"
import { useNavigate as useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import axios, {isCancel, AxiosError} from 'axios';

import { getfournisseurs, createfournisseur } from "../../fournisseur/fournisseurs";


export async function action({ request, params }) {
  console.log(params)
  const formData = await request.formData();
  
 
  const updates = Object.fromEntries(formData);
  console.log(formData)
  await updatearticle(params, updates);
  
  return redirect(`/articles/articles/${updates.id}`);
}
export default function EditarticleF() {
  const { articles,q1 } = useLoaderData();
  const [quer,setquer]=useState('')
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const _navigate = useHistory();
const [fournisseur1,setFournisseurs1]=useState([]);
const [fournisseur2,setFournisseurs2]=useState([]);
const [fournisseur3,setFournisseurs3]=useState([]);

const findObjectsNotInArray2 = (arr1, arr2) => {
  return arr1.filter(obj1 => !arr2.some(obj2 => obj1._id === obj2._id));
};
 async function saveform(updates_id){
 console.log(fournisseur2,fournisseur3)
   let y=[]
 if(fournisseur2.length>fournisseur3.length)
  
 {
  console.log('cas 1')
   y=findObjectsNotInArray2(fournisseur2,fournisseur3)
  console.log(y)
  const {data}= await axios.post(
    'http://localhost:5000/articlesf1/'+param, {
        method: "post",
        body: y
        ,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(data)
 }
 else{
  console.log('cas 2')
    y=findObjectsNotInArray2(fournisseur3,fournisseur2)
  console.log(y)
  const daf= await axios.post(
    'http://localhost:5000/articlesdf1/'+param, {
        method: "post",
        body: y,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log('daf')
    console.log(daf)
 }
 
   
    setShouldRedirect(true)
      
 }
const [checkedValues, setCheckedValues] = useState({});
const [checkedValues1, setCheckedValues1] = useState({});
 
const handleCheckboxChange = (event) => {
  const { name, checked } = event.target;

  setCheckedValues(prevCheckedValues => ({
    ...prevCheckedValues,
    [name]: checked
  }));
  console.log('checkedValues')
  console.log(checkedValues)
};
const handleCheckboxChange1 = (event) => {

  const { name, checked } = event.target;
  

  setCheckedValues1(prevCheckedValues1 => ({
    ...prevCheckedValues1,
    [name]: checked
  }));

  // Ensure that you are logging the updated state after the state update has been processed
  
    console.log('checkedValues1');
    console.log(checkedValues1);
  
};
const handleRemoveChecked1 = () => {
   
  const filteredElements = fournisseur2.filter((element,index) => {
     
    console.log('checkedValues1')
   console.log(checkedValues1)
      return checkedValues1['option'+(index+1)]!=true;
    
  });
  setFournisseurs2(filteredElements);
};
const doSomething = async(x) =>{
  console.log(x)
  setFournisseurs1(await getfournisseurs(x));
  }
  const navigation = useNavigation();
    const submit = useSubmit();
    const searching =
      navigation.location &&
      new URLSearchParams(navigation.location.search).has(
        "q1"
      );
      useEffect(()=>{
        console.log(shouldRedirect)
        if(shouldRedirect) _navigate(`/articles/articles/${contactId}`)
      },[shouldRedirect])
  useEffect(() => {
   
   if(quer.length>0)
    doSomething(quer)
  else
  setFournisseurs1([])
  }, [quer
  ]);
 
const {contactId}=useParams()
console.log(contactId)
const [param,setParam]=useState(contactId)
  const navigate = useNavigate();
  const [article1,setarticle1]=useState([])
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
     setarticle1(data[0])
    let dataf=await axios.post('http://localhost:5000/articlesf',{
      method:"post",
      body:body,
      headers:{
        'Content-Type':'application/json'
      }
    })
    console.log(dataf)
     
    setFournisseurs2(dataf.data)
    setFournisseurs3(dataf.data)
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
    <div>
      Fournisseur {quer}
  
      {fournisseur2.map((option,index)=>{
    
  return <div key={index}>Fournisseur {index+1}<br/>
  <label>
    <input
      type="checkbox"
      name={`option${index + 1}`}
     
      checked={checkedValues1[`option${index + 1}`] || false}
      onChange={(e)=>handleCheckboxChange1(e)}
    />
    <div>
      <ul>
    {Object.entries(option).map((a,b)=>{
     return <li key={b}>{a[0]} : {a[1]}</li>
    })}
    </ul>
    </div>
  </label>
  </div>})}
  <button onClick={handleRemoveChecked1}>Remove Checked Elements</button>
       
      <button onClick={() => {
        
        console.log(checkedValues)
        Object.values(checkedValues).forEach((e,index)=>{
          console.log(e,index)
          if(e){
            if(fournisseur1.length>0){
            let fetchedCompanies=fournisseur1[index]
            let x=Array.from(fournisseur2.map(e=>e._id)).indexOf(fetchedCompanies._id)
            if(x==-1)
            setFournisseurs2(prevCompanies=>{return [...prevCompanies, fetchedCompanies]})
            }
          }
        })
         setquer("")
         document.getElementById("q1").value=""
      }}>Add Checked Values</button>
      <button onClick={()=>{
console.log('Saved')
saveform(contactId)
      }}>Save form values</button>
    <Form id="search-form" role="search">
                <input
                  id="q1"
                  aria-label="Search articles"
                  placeholder="Search"
                  type="search"
                  name="q1"  onChange={(event) => {
                    const isFirstSearch = q1 == null;
                    setquer(event.target.value)
                    submit(event.currentTarget.form, {
                      replace: !isFirstSearch,
                    });
                  }}
  
                  className={searching ? "loading" : ""}
                />
                <div
                  id="search-spinner"
                  aria-hidden
                  hidden={!searching}
  
                />
                <div
                  className="sr-only"
                  aria-live="polite"
                ></div>
              </Form>
              
             
      
        <label>
        <span>Contact ID </span>
         
        {contactId}
        </label>
        <br/>
        <label>
        <span>Name </span>
        
        {article1.reference}
        </label>
        <br/>
        <label>
        <span>Designation </span>
         
      
      {article1?.designation}
      </label>
      <br/>
      <label>
        <span>Prix vente </span>
        
      </label>
      {article1?.p_vente}
      <br/>
      <label>
        <span>Fournisseur </span>
         
         
        {article1?.description}
      
       </label>
        
  
      
{fournisseur1.map((option,index)=>{
  return <div key={index}>Fournisseur {index+1}<br/>
  <label>
    <input
      type="checkbox"
      name={`option${index + 1}`}
      checked={checkedValues[`option${index + 1}`] || false}
      onChange={handleCheckboxChange}
    />
    <ul>
    {Object.entries(option).map((e,ind)=>{
      return <li key={ind}>{JSON.stringify(e)}</li>
    })}
    </ul>
  </label>
  </div>
})}

      
    
    </div>
  );
}