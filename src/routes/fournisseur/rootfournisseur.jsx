import { Outlet,Link,
    useLoaderData, Form, redirect, NavLink,useNavigation,useSubmit,} from "react-router-dom";
    import { useEffect } from "react";
  import { getfournisseurs, createfournisseur } from "./fournisseurs";

import {useFetcher } from "react-router-dom";
  export async function action() {
    const fournisseur = await createfournisseur();
    return redirect(`/fournisseurs/fournisseurs/${fournisseur.id}/edit`);
   // return { fournisseur };
  }
  export async function loader({ request }) {
   // const fournisseurs = await getfournisseurs();
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const fournisseurs = await getfournisseurs(q);
    return { fournisseurs, q };
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
  export default function Rootfournisseur() {
    const { fournisseurs,q } = useLoaderData();
    useEffect(() => {
      document.getElementById("q").value = q;
    }, [q]);
    const navigation = useNavigation();
    const submit = useSubmit();
    const searching =
      navigation.location &&
      new URLSearchParams(navigation.location.search).has(
        "q"
      );
      return (
        <>
          <div id="sidebar">
            <h1>React Router fournisseurs</h1>
            <div>
              <Form id="search-form" role="search">
                <input
                  id="q"
                  aria-label="Search fournisseurs"
                  placeholder="Search"
                  type="search"
                  name="q"  onChange={(event) => {
                    const isFirstSearch = q == null;
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
              
            </div>
            <nav>
            {fournisseurs.length ? (
              <ul>
                {fournisseurs.map((fournisseur) => (
                  <li key={fournisseur._id}>
                    <NavLink 
                      to={`fournisseurs/${fournisseur._id}`}
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }
                    >
                    
                    {fournisseur.nomfournisseur}
                    
                    </NavLink>
                    
                    </li>  
                    ))}
              </ul>
  ): (
    <p>
      <i>No fournisseurs</i>
    </p>
  )}
           </nav> 
         
        </div>
          
          <Form method="post">
              <button type="submit">New</button>
            </Form>
          <div id="detail" className={
            navigation.state === "loading" ? "loading" : ""
          }><Outlet /></div>
        </>
      );
    }
    