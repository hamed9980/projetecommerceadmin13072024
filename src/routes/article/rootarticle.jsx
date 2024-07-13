import { Outlet,Link,
    useLoaderData, Form, redirect, NavLink,useNavigation,useSubmit,} from "react-router-dom";
    import { useEffect } from "react";
  import { getarticles, createarticle } from "./articles";

import {useFetcher } from "react-router-dom";
  export async function action() {
    const article = await createarticle();
    return redirect(`/articles/articles/${article.id}/edit`);
   // return { article };
  }
  export async function loader({ request }) {
   // const articles = await getarticles();
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const articles = await getarticles(q);
    return { articles, q };
  }
  function Favorite({ article }) {
    const fetcher = useFetcher();
    const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : article.favorite;
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
  export default function RootArticle() {
    const { articles,q } = useLoaderData();
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
            <h1>React Router articles</h1>
            <div>
              <Form id="search-form" role="search">
                <input
                  id="q"
                  aria-label="Search articles"
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
            {articles.length ? (
              <ul>
                {articles.map((article) => (
                  <li key={article._id}>
                    <NavLink 
                      to={`articles/${article._id}`}
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }
                    >
                    
                    {article.reference}
                    
                    </NavLink>
                    
                    </li>  
                    ))}
              </ul>
  ): (
    <p>
      <i>No articles</i>
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
    