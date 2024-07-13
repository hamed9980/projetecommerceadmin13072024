// Frontend code 
// Filename - App.js
// Filename - App.js
 import Profile from './Profile'
import { useState } from 'react'
function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("")
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5000/register', {
            method: "post",
            body: JSON.stringify({ name, email,password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setEmail("");
            setName("");
            setPassword("")
        }
    }
    return (
        <>
        <Profile></Profile>
            <h1>This is React WebApp </h1>
            <form action="">
                <input type="text" placeholder="name"
                value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password"
                value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit"
                onClick={handleOnSubmit}>submit</button>
            </form>
 
        </>
    );
}
 
export default App;