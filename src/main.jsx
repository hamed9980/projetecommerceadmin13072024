/* existing imports */

import * as React from "react";
import './foundhereindex.css'
import ErrorPage from "./error-page";
import * as ReactDOM from "react-dom/client";
import RootArticle, { loader as rootLoader,
  action as rootAction,

 } from './routes/article/rootarticle';
 import Deleted,{ action as destroyAction } from "./routes/article/destroyarticle";
import Article,{loader as articleLoader,action as articleAction,} from "./routes/article/article"
import EditArticle , {
  action as editActionArticle,
} from "./routes/article/editarticle";



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Rootfournisseur, { loader as rootLoaderF,
  action as rootActionF,

 } from './routes/fournisseur/rootfournisseur';
 import DeletedF,{ action as destroyActionF } from "./routes/fournisseur/destroyfournisseur";
import Fournisseur,{loader as fournisseurLoader,action as fournisseurAction,} from "./routes/fournisseur/fournisseur"
import Editfournisseur , {
  action as editActionfournisseur,
} from "./routes/fournisseur/editfournisseur";
import AssignFournisseur from './routes/article/old/assignfournisseur'
import AsignArticle from "./routes/fournisseur/old/asignarticle"
import AssignPriceFournisseur from "./routes/article/old/assignpricesfournisseur";
 
const router = createBrowserRouter([
  {path:'',element:<div>Welcome</div>},
  {path:'articles',element:<RootArticle/>,
 errorElement: <ErrorPage />,
  loader: rootLoader,
  action: rootAction,
 children:[
  {path:"articles",element:<Article/>,
  loader: articleLoader,
  action: articleAction,
  
},
  {
    path: "articles/:contactId",
    element: <Article />,
     loader: articleLoader,
     action: articleAction,
  
  },
  {
    path: "articles/:contactId/edit",
    element: <EditArticle />,
    loader: articleLoader,
    action: editActionArticle,
    
  },
  {
    path: "articles/:contactId/editf",
    element: <AssignFournisseur />,
    loader: articleLoader,
    action: editActionArticle,
    
  },
  {
    path: "articles/:contactId/editp",
    element: <AssignPriceFournisseur />,
    loader: articleLoader,
    action: editActionArticle,
    
  },
  {
    path: "articles/:contactId/destroy",
    element:<Deleted/>,
    action: destroyAction,
    
  },
]
},
{path:'fournisseurs',element:<Rootfournisseur/>,
 errorElement: <ErrorPage />,
   loader: rootLoaderF,
   action: rootActionF,
  children:[
   {path:"fournisseurs",element:<Fournisseur/>,
   loader: fournisseurLoader,
   action: fournisseurAction,
   
 },
   {
     path: "fournisseurs/:contactId",
     element: <Fournisseur />,
      loader: fournisseurLoader,
      action: fournisseurAction,
   
   },
   {
     path: "fournisseurs/:contactId/edit",
     element: <Editfournisseur />,
     loader: fournisseurLoader,
     action: editActionfournisseur,
     
   },
   
   {
    path: "fournisseurs/:contactId/edita",
    element: <AsignArticle />,
    loader: fournisseurLoader,
    action: editActionfournisseur,
    
  },
   {
     path: "fournisseurs/:contactId/destroy",
     element:<DeletedF/>,
     action: destroyActionF,
     
   },
 ]
 }
]
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
/*
import Contact,{loader as contactLoader,action as contactAction,} from "./routes/contact/contact";
import Index from "./routes/index";
import { action as destroyAction } from "./routes/contact/destroy";
import Root, { loader as rootLoader,
  action as rootAction,

 } from "./routes/root";
 import EditContact , {
  action as editAction,
} from "./routes/contact/edit";
{

    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
  children:[
    

    { index: true, element: <Index /> },
    {
      path: "contacts/:contactId/destroy",
      action: destroyAction,
      errorElement: <div>Oops! There was an error.</div>,
    },
  {
    path: "contacts/:contactId",
    element: <Contact />,
    loader: contactLoader,
    action: contactAction,
    errorElement: <ErrorPage />,
  },
  {
    path: "contacts/:contactId/edit",
    element: <EditContact />,
    loader: contactLoader,
    action: editAction,
    errorElement: <ErrorPage />,
  },

]}*/