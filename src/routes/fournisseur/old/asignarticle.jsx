import { Form, useLoaderData, redirect,  useNavigate, useNavigation,useSubmit} from "react-router-dom";
import { updatefournisseur } from "../fournisseurs";
import {useState,useEffect} from "react"
import { useParams } from 'react-router';
import axios, {isCancel, AxiosError} from 'axios';
import { useNavigate as useHistory } from 'react-router-dom';
import { getarticles, createarticle } from "../../article/articles";


export async function action({ request, params }) {
  console.log(params)
  const formData = await request.formData();
  
 
  const updates = Object.fromEntries(formData);
  console.log(formData)
  await updatefournisseur(params, updates);
  
  return redirect(`/fournisseurs/fournisseurs/${updates.id}`);
}
export default function AssignArticle() {
  const _navigate = useHistory();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [articles3,setArticles3]=useState([]);
  useEffect(()=>{
    console.log(shouldRedirect)
    if(shouldRedirect) _navigate(`/fournisseurs/fournisseurs/${contactId}`)
  },[shouldRedirect])

  const findObjectsNotInArray2 = (arr1, arr2) => {
    return arr1.filter(obj1 => !arr2.some(obj2 => obj1._id === obj2._id));
  };
   async function saveform(updates_id){
   console.log(articles2,articles3)
     let y=[]
   if(articles2.length>articles3.length)
    
   {
    console.log('cas 1')
     y=findObjectsNotInArray2(articles2,articles3)
    console.log(y)
    const {data}= await axios.post(
      'http://localhost:5000/fournisseursf1/'+param, {
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
      y=findObjectsNotInArray2(articles3,articles2)
    console.log(y)
    const daf= await axios.post(
      'http://localhost:5000/fournisseursdf1/'+param, {
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
     'http://localhost:5000/fournisseursf', {
         method: "post",
         body: body,
         headers: {
             'Content-Type': 'application/json'
         }
     });
     if(data.length>0)
     setfournisseur1(data)
    setArticles2(data)
    setArticles3(data)
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
      Article {quer}
      {articles2.map((option,index)=>{
  return <div key={index}>Article {index+1}<br/>
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
  <button onClick={handleRemoveChecked1}>Remove Checked Elements</button>
       
      <button onClick={() => {
        
        console.log(checkedValues)
        Object.values(checkedValues).forEach((e,index)=>{
        
          console.log(e,index)
          if(e){
            if(articles1.length!=0){
            let fetchedCompanies=articles1[index]
            let x=Array.from(articles2.map(e=>e._id)).indexOf(fetchedCompanies._id)
            if(x==-1)
            setArticles2(prevCompanies=>{return [...prevCompanies, fetchedCompanies]})
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
              
             
      <p>
       <span>ID </span> 
        {contactId}<br/>
        <span>Name </span>
     
        {fournisseur1?.nomfournisseur}<br/>
        <span>Nomenclature </span>
        
        {fournisseur1?.nomenclature}<br/>
        <span>Contact </span>
        
        {fournisseur1?.contact}<br/>
      </p>
      <label>
        <span>Téléphone </span>
        
      </label>
      {fournisseur1?.telephone}<br/>
      <label>
        <span>Article </span>

        
       <br/>
      </label>
      
 
       <p></p>
     
   
      
{articles1.map((option,index)=>{
  return <div key={index}>Article {index+1}<br/>
  <label>
    <input
      type="checkbox"
      name={`option${index + 1}`}
      checked={checkedValues[`option${index + 1}`] || false}
      onChange={handleCheckboxChange}
    />
    <ul>
    {Object.entries(option).map((e,ind)=>{
      return <li key={ind}>{e[0]} : {e[1]}</li>
    })}
    </ul>
  </label>
  </div>
})}

      
    
    </div>
  );
}