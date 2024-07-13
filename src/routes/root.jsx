import { Outlet,Link,
  useLoaderData, Form, redirect, NavLink,useNavigation,useSubmit,} from "react-router-dom";
  import { useEffect } from "react";
import { getContacts, createContact } from "./contact/contacts";

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
 // return { contact };
}
export async function loader({ request }) {
 // const contacts = await getContacts();
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}
export default function Root() {
  const { contacts,q } = useLoaderData();
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
          <h1>React Router Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
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
            <form method="post">
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
            <ul>
              <li>
                <Link href={`/contacts/1`}>Your Name</Link>
              </li>
              <li>
                <Link href={`/contacts/2`}>Your Friend</Link>
              </li>
            </ul>
          </nav>
        </div>
        <nav>
        {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {/* other code */}
                  </NavLink>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
        <Form method="post">
            <button type="submit">New</button>
          </Form>
        <div id="detail" className={
          navigation.state === "loading" ? "loading" : ""
        }><Outlet /></div>
      </>
    );
  }