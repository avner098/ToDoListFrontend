import { useState } from "react"

const Register = ()=>{
    const [email,setEmail]= useState('')
    const [password,usePassword]= useState('')

    return(
        <form className="register" onsubmit={}>
            <h4>Register</h4>
            <label><span class="material-symbols-outlined">mail</span></label>
            <input type="email" onChange={}/>

        </form>

    )
}