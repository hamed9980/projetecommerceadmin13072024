
import { useParams } from 'react-router';
import { deletearticle } from './articles';

export async function action({ params }) {
  let contactId1=params.contactId;
  console.log(contactId1)
  await deletearticle(contactId1)
     
  return null;
  
}

export default function Deleted(){
  const {contactId}=useParams()
  return <div>Element <span id="a">{JSON.stringify(contactId)}</span> deleted </div>
}