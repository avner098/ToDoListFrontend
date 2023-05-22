import { useState } from "react"

const Login = ()=>{
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')

    const submitHendler = async (e) =>{
        e.preventDefault()

        console.log(email,password)
    }

    return(
        <form className="login" onsubmit={submitHendler}>
            <h4>Login</h4>
            <label><span class="material-symbols-outlined">mail</span></label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>

            <label><span class="material-symbols-outlined">password</span></label>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>

            <button >Login</button>
        </form>

    )
}
export default Login