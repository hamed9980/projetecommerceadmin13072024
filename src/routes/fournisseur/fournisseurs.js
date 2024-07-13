import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import axios, {isCancel, AxiosError} from 'axios';
import { useParams } from 'react-router';
export async function getfournisseurs(query) {
  await fakeNetwork(`getfournisseurs:${query}`);
  let body={}
  if(query!=null){
    body={nomfournisseur: {$regex :query}}
  }
  const {data}= await axios.post(
    'http://localhost:5000/fournisseurs', {
        method: "post",
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let fournisseurs=data;
 
  return fournisseurs
}
var mongoObjectId = function () {
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
};
export async function createfournisseur() {
  await fakeNetwork();
  let id = mongoObjectId();
  let fournisseur = { id, createdAt: Date.now() };
  let fournisseurs = handleOnSubmit({});
 // fournisseurs.unshift(fournisseur);
  await set(fournisseurs);
  return fournisseur;
}
var x=[]
function setArt1(a){
  x=a
}
const handleOnSubmit1 = async (id,e) => {
  console.log(e)

let result = await axios.post(
  'http://localhost:5000/editfournisseur', {
      method: "post",
      body:  e ,
      headers: {
          'Content-Type': 'application/json'
      }
  })
  
  console.warn(result);
  if (result) {
      alert("Data saved succesfully");
       
  }
}


const handleOnSubmit = async (e) => {
  
   const {data}= await axios.post(
   'http://localhost:5000/fournisseurs', {
       method: "post",
       body: e,
       headers: {
           'Content-Type': 'application/json'
       }
   });
   setArt1(data)
 }
export async function getfournisseur(id) {
 
 
 handleOnSubmit(JSON.stringify({_id:id}));
 let fournisseur=x
 return fournisseur ?? null;
}

export async function updatefournisseur(id,updates){
  await fakeNetwork();
console.log(id,updates)
  handleOnSubmit1(id,updates);
}


export async function deletefournisseur(id){
  await fakeNetwork();
  let contactId=id;
  const {data}= await axios.post(
    'http://localhost:5000/deletefournisseur', {
        method: "post",
        body: {_id:id},
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(data)
  console.log(contactId)
}
 

export async function olddeletefournisseur(id) {
  let fournisseurs = await localforage.getItem("fournisseurs");
  let index = fournisseurs.findIndex(fournisseur => fournisseur.id === id);
  if (index > -1) {
    fournisseurs.splice(index, 1);
    await set(fournisseurs);
    return true;
  }
  return false;
}

function set(fournisseurs) {
  return localforage.setItem("fournisseurs", fournisseurs);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}