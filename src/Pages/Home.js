import React,{useState,useEffect} from "react"
import Producto from "../Components/Producto"
import firebase from "../Config/firebase"
import Spinner from 'react-bootstrap/Spinner'
import { Container } from "react-bootstrap"

function InicioPage(){
    const [loading,setLoading] = useState(true)
    const [productos,setProductos] = useState([])
    console.log('Database', firebase.db)
    const getProductos = async () => {
        try {
            setLoading(true)
            const querySnapshot = await firebase.db.collection("productos")
            .get()
            setProductos(querySnapshot.docs)
            setLoading(false)
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
               <h1>Productos</h1>
               {productos.map(producto=><Producto datos={{...producto.data(), id:producto.id}} />)}
            </Container>
            
        )
    }
}
export default InicioPage;