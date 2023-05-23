import { useState,useContext } from "react"
import { AuthContext } from "../context/authContext"


const Register = ()=>{
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [error,setError]=useState(null)
    const [loading,setLoading] = useState(null)
    const context = useContext(AuthContext)

    const register = async(email,password) =>{
        setLoading(true)
        setError(null)

        const response = await fetch('/api/user/Register',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({email,password})
        })
        
        const json =response.json()
        console.log(json)
        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json))
            context.dispatch({type : 'LOGIN',payload : json})
            setLoading(false)
        }
            
    }

    const submitHendler = async (e) =>{
        e.preventDefault()

        await register(email,password)
    }

    return(
        <form className="register" onSubmit={submitHendler}>
            <h4>Register</h4>
            <label><span className="material-symbols-outlined">mail</span></label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>

            <label><span className="material-symbols-outlined">password</span></label>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>

            <button disabled={loading}>Register</button>
            {error && <div className="error">{error}</div>}
        </form>

    )
}
export default Register