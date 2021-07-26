import React, { useState } from "react"
import styles from "../Styles/styles.css"
import firebase from "../Config/firebase"
import { Button } from "react-bootstrap"
import FormGroup from "../Components/Forms/FormGroup"
import AlertCustom from "../Components/AlertCustom"

const button = {
    style: {
        marginTop:"10px"
    }
}

function RegistroPage(){
    const [form,setForm] = useState({nombre:'',apellido:'',email:'',password:''})
    const [alert, setAlert] = useState({variant:"", text:""})
    const handleSubmit = async (event)=>{
        console.log("handleSubmit",form)
        event.preventDefault()
        try {
            const responseUser = await firebase.autenticacion.createUserWithEmailAndPassword(form.email, form.password)
            console.log("User", responseUser)
            const document = await firebase.db.collection("usuarios")
            .add({
                nombre: form.nombre,
                apellido: form.apellido,
                userId: responseUser.user.uid
            })
            console.log("Document", document)
            setAlert({variant:"success", text: "Registro exitoso!"})
        } catch(e) {
            console.log("Error", e)
            setAlert({variant:"danger", text: e.message})
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
                <FormGroup type="text" label="Nombre" name="nombre" value={form.nombre} placeholder="Ingrese su nombre" onChange={handleChange}/>
                <FormGroup type="text" label="Apellido" name="apellido" value={form.apellido} placeholder="Ingrese su apellido" onChange={handleChange}/>
                <FormGroup type="email" label="Email" name="email" value={form.email} placeholder="Ingrese su email" onChange={handleChange}/>
                <FormGroup type="password" label="Password" name="password" value={form.password} placeholder="Ingrese su contraseña" onChange={handleChange}/>
                <Button style={button.style} variant="primary" type="submit">Registrarse</Button>
                <AlertCustom variant={alert.variant} text={alert.text}/>
            </form>
        </div>
    )
}

export default RegistroPage;