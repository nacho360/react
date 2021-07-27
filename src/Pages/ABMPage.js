import React,{useState, useEffect} from "react"
import { Button, Container, Form, Spinner } from "react-bootstrap"
import firebase from "../Config/firebase"
import FormGroup from "../Components/Forms/FormGroup"
import Producto from "../Components/Producto"

const button = {
    style: {
        marginTop:"10px",
    }
}

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
            <Container>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
            
        )
    }else{
        return(
            <Container>
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
                <div>
                    <form onSubmit={handleSubmit} style={{width: '50%'}}>
                        <h1>Alta de producto</h1>
                        <FormGroup label="Nombre" name="name" type="text" value={productoForm.name} placeholder="Ingrese el nombre del producto" change={handleChange}/>
                        <FormGroup label="Precio" name="price" type="number" value={productoForm.price} placeholder="Ingrese el precio del producto" change={handleChange}/>
                        <FormGroup label="Descripcion" name="description" type="text" value={productoForm.description} placeholder="Ingrese la descripcion del producto" change={handleChange}/>
                        <Button style={button.style}type="submit">Agregar</Button>
                    </form>
                </div>
            </Container>
        )
    }
}

export default ABMPage;