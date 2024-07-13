import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import axios, {isCancel, AxiosError} from 'axios';
import { useParams } from 'react-router';
export async function getarticles(query) {
  await fakeNetwork(`getarticles:${query}`);
  let body={}
  if(query!=null){
    body={reference: {$regex :query}}
  }
  const {data}= await axios.post(
    'http://localhost:5000/articles', {
        method: "post",
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let articles=data;
 
  return articles
}
var mongoObjectId = function () {
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
};
export async function createarticle() {
  await fakeNetwork();
  let id = mongoObjectId();
  let article = { id, createdAt: Date.now() };
  let articles = handleOnSubmit({});
 // articles.unshift(article);
  await set(articles);
  return article;
}
var x=[]
function setArt1(a){
  x=a
}
const handleOnSubmit1 = async (id,e) => {
  console.log(e)
  var formData = new FormData();
var imagefile = document.querySelector('#file');

var result1=[]
if(imagefile!=undefined)
if(imagefile.files.length>0){
  console.log(imagefile.files.length)
for(var x=0;x<imagefile.files.length; x++)
formData.append("image", imagefile.files[x]);

result1=await axios.post('http://localhost:5000/files/profile', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
result1=result1.data
console.log(result1)
}
if(result1!=[]){
  e.images=result1;
}
let result = await axios.post(
  'http://localhost:5000/editarticle', {
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
   'http://localhost:5000/articles', {
       method: "post",
       body: e,
       headers: {
           'Content-Type': 'application/json'
       }
   });
   setArt1(data)
 }
export async function getarticle(id) {
 
 
 handleOnSubmit(JSON.stringify({_id:id}));
 let article=x
 return article ?? null;
}

export async function updatearticle(id,updates){
  await fakeNetwork();
console.log(id,updates)
  handleOnSubmit1(id,updates);
}


export async function deletearticle(id){
  await fakeNetwork();
  let contactId=id;
  const {data}= await axios.post(
    'http://localhost:5000/deletearticle', {
        method: "post",
        body: {_id:id},
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(data)
  console.log(contactId)
}
 

export async function olddeletearticle(id) {
  let articles = await localforage.getItem("articles");
  let index = articles.findIndex(article => article.id === id);
  if (index > -1) {
    articles.splice(index, 1);
    await set(articles);
    return true;
  }
  return false;
}

function set(articles) {
  return localforage.setItem("articles", articles);
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