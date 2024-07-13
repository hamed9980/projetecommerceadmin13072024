import { Form, useLoaderData, redirect,  useNavigate, useNavigation,useSubmit} from "react-router-dom";
import { updatearticle } from "../articles";
import {useState,useEffect} from "react"
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
  const [formData, setFormData] = useState({});
  const handleInputChangePrice = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmitPrice = async (e) => {
    e.preventDefault();
    // You can now access the form data in the formData state
    console.log(formData);
   
   
    const {data}= await axios.post(
      'http://localhost:5000/fournisseursupdateprice', {
          method: "post",
          body: formData
          ,
          headers: {
              'Content-Type': 'application/json'
          }
      });
      console.log(data)
  };
  const { articles,q1 } = useLoaderData();
  const [quer,setquer]=useState('')
const [fournisseur1,setFournisseurs1]=useState([]);
const [fournisseur2,setFournisseurs2]=useState([]);
const [prices,setPrices]=useState([])
 
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
  useEffect(() => {
    
   if(quer.length>0)
    doSomething(quer)
  else
  setFournisseurs1([])
  }, [quer]);
 
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
     'http://localhost:5000/articlesfp', {
         method: "post",
         body: body,
         headers: {
             'Content-Type': 'application/json'
         }
     });
     if(data.length>0)
     setarticle1(data[0])
    setFournisseurs2(data[0])
    setPrices(data[1])
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
    <Form onSubmit={handleSubmitPrice}>
      Fournisseurs Assigner prix
       
      {fournisseur2.map((option,index)=>{
  return <div key={index}>Fournisseur {index+1}
   <br/>
   Prix:<input type="number" name={"price"+index} value={prices[index]}  onChange={(e)=>{
    
    handleInputChangePrice(e)
  handleInputChangePrice({target:{
    name:'fournisseur'+index,
    value:option._id
  }})
  handleInputChangePrice({target:{
    name:'article'+index,
    value:contactId
  }})
  }}></input>
    
   <br/>
  <label>
    <input
      type="checkbox"
      name={`option${index + 1}`}
      checked={checkedValues1[`option${index + 1}`] || false}
      onChange={handleCheckboxChange1}
    />
    <ul>
    {Object.entries(option).map((e,ind)=>{
      return <li key={ind}>{e[0]} : {e[1]}</li>
     
    })}
    </ul>
  </label>
  </div>})}
 
       <button type="submit" >save form prices</button>
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
       
      </label>
      <br/>
      <label>
        <span>Description </span>
       
        {article1?.description}
      </label>
      <br/>
     
      


      
    
    </div>
  );
}