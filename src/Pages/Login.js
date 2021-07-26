import React, { useState } from "react"
import firebase from "../Config/firebase"
import FormGroup from "../Components/Forms/FormGroup"
import { Button } from "react-bootstrap"

function Login(){
    const [form,setForm] = useState({email:'',password:''})
    const handleSubmit = async (event)=>{
        console.log("handleSubmit",form)
        event.preventDefault()
        try {
            const responseUser = await firebase.autenticacion.signInWithEmailAndPassword(form.email, form.password)
            console.log(responseUser)
        } catch(e) {
            console.log("Error", e)
            alert(e.message)
        }
    }
    const handleChange = (event)=>{
        const name = event.target.name
        const value = event.target.value
        console.log("handleChange",name,value)
        setForm({...form,[name]:value})
    }
    return(
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <FormGroup label="Email" name="email" type="email" value={form.email} placeholder="Ingrese su correo electronico" change={handleChange}/>
                <FormGroup label="Password" name="password" type="password" value={form.password} placeholder="Ingrese su contraseña" change={handleChange}/>
                <Button type="submit" variant="primary">Login</Button>
            </form>
        </div>
    )
}

export default Login;