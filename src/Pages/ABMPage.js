import React,{useState, useEffect} from "react"
import { Form } from "react-bootstrap"
import firebase from "../Config/firebase"
import FormGroup from "../Components/Forms/FormGroup"
import Producto from "../Components/Producto"

function ABMPage(){
    const [loading,setLoading] = useState(true)
    const [productoForm,setProductoForm] = useState({id:null, name:"", price:"", description:""})
    const [productos, setProductos] = useState([])
    const [reload, setReload] = useState(false)
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            let document = null
            if(productoForm.id===null) {
                document = await firebase.db.collection("productos")
                .add(productoForm)
            } else {
                document = await firebase.db.doc("productos/" + productoForm.id)
                .set(productoForm)
            }
            setReload(true)
            console.log("Documnet", document)
        } catch(e){
            console.log("error", e)
        }
    }

    
    const getProductos = async () => {
        try {
            setLoading(true)
            const querySnapshot = await firebase.db.collection("productos")
            .get()
            setProductos(querySnapshot.docs)
            setLoading(false)
            setReload(false)
        }catch(e){
            console.log("error", e)
        }
    }
            
    useEffect(
        () => {
            getProductos()
        },
        []
    )

    useEffect(
        () => {
            if(reload)
            getProductos()
        },
        [reload]
    )

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        console.log("handleChange",name,value)
        setProductoForm({...productoForm,[name]:value})
    }

    const handleClickModificar = (producto) => {
        setProductoForm(producto)
    }

    const handleClickEliminar = (producto) => {
        try {
            firebase.db.doc("productos/" + producto.id)
            .delete()
            setReload(true)
        }catch(e) {
            console.log("error", e)
        }
    }
    
    if(loading){
        return(
            <div>
               loading...
            </div>
            
        )
    }else{
        return(
            <div className='container'>
                <h1>Listado de productos</h1>
                {productos.map(producto => 
                    <Producto 
                        datos={{...producto.data(), id:producto.id}} 
                        modificar={true} 
                        eliminar={true} 
                        clickModificar={handleClickModificar} 
                        clickEliminar={handleClickEliminar}
                    />
                )}
                <form onSubmit={handleSubmit}>
                    <h1>Alta de producto</h1>
                    <div>
                        <label>Nombre</label>
                        <input type="text" name="name" value={productoForm.name} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Precio</label>
                        <input type="text" name="price" value={productoForm.price} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Descripcion</label>
                        <input type="text" name="description" value={productoForm.description} onChange={handleChange}></input>
                    </div>
                    <button type="submit">Agregar</button>
                </form>
            </div>
        )
    }
}

export default ABMPage;