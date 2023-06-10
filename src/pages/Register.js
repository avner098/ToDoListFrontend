import { useState,useContext } from "react"
import { AuthContext } from "../context/authContext"


const Register = ()=>{
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [error,setError]=useState(null)
    const [errorClass,setErrorClass]=useState('alert alert-dismissible alert-warning')
    const [loading,setLoading] = useState(null)
    const context = useContext(AuthContext)

    const register = async(email,password) =>{
        setLoading(true)
        setError(null)

        const response = await fetch('https://to-do-list-backend-theta.vercel.app/api/user/Register',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({email,password})
        })
        
        const json =response.json()
        console.log(json)
        if(!response.ok){
            
            setLoading(false)
            setError('This email is registered in our system, please enter another email')
            setErrorClass('alert alert-dismissible alert-warning')
        }
        if(response.ok){
           
            localStorage.removeItem('user');
            context.dispatch({ type: 'LOGOUT' });
            
            setPassword('')
            setEmail('')
            setLoading(false)
            setError('You have successfully registered')
            setErrorClass('alert alert-dismissible alert-success')
        }
            
    }

    const submitHendler = async (e) =>{
        e.preventDefault()

        await register(email,password)
    }

    return(
        <form className="register" onSubmit={submitHendler}>
            <h2><strong>Register</strong></h2>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label mt-4"><span className="material-symbols-outlined">mail</span></label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="xxxx@xxxx.com" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="form-label mt-4"><span className="material-symbols-outlined">password</span></label>
                <input type="password"  className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            </div>
            <button className="btn btn-success" disabled={loading}>Register</button>
           

            {error &&
            <div className={errorClass}>
            
            
            {error}
            </div>}
        </form>

    )
}
export default Register