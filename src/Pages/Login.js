import React, { useContext, useState } from "react"
import firebase from "../Config/firebase"
import FormGroup from "../Components/Forms/FormGroup"
import { Button } from "react-bootstrap"
import EcommerceContext from "../Context/ecommerceContext"
import AlertCustom from "../Components/AlertCustom"

const button = {
    style: {
        marginTop:"10px",
    }
}

function Login(){
    const context = useContext(EcommerceContext)
    const [alert, setAlert] = useState({variant:"", text:""})
    const [form,setForm] = useState({email:'',password:''})
    const handleSubmit = async (event)=>{
        console.log("handleSubmit",form)
        event.preventDefault()
        try {
            const responseUser = await firebase.autenticacion.signInWithEmailAndPassword(form.email, form.password)
            console.log(responseUser)
            const userInfo = await firebase.db.collection("usuarios")
            .where("userId","==", responseUser.user.uid)
            .get()
            console.log("usuario", userInfo.docs[0]?.data().nombre)
            context.loginUser(userInfo.docs[0]?.data())
            setAlert({variant: "success", text: "Bienvenido " + userInfo.docs[0]?.data().nombre })
        } catch(e) {
            console.log("Error", e)
            setAlert({variant: "danger", text: e.message })
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
                <Button style={button.style} type="submit" variant="primary">Login</Button>
                <AlertCustom variant={alert.variant} text={alert.text}/>
            </form>
        </div>
    )
}

export default Login;