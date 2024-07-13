function Login(){
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
            alert("Logged in succesfully");
            setEmail("");
            setName("");
            setPassword("")
        }
    }
    return (<>
    Welcome Login
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
    </>)
    
}