
import { useParams } from 'react-router';
import { deletefournisseur } from './fournisseurs';

export async function action({ params }) {
  let contactId1=params.contactId;
  console.log(contactId1)
  await deletefournisseur(contactId1)
     
  return null;
  
}

export default function Deleted(){
  const {contactId}=useParams()
  return <div>Fournisseur <span id="a">{JSON.stringify(contactId)}</span> deleted </div>
}