import React, {useState,useEffect} from "react"
import Producto from "../Components/Producto"
import {Link} from "react-router-dom"
import firebase from "../Config/firebase"
import Spinner from 'react-bootstrap/Spinner'

function DetallePage(props){
    const id = props.match.params.id
    const [loading,setLoading] = useState(true);
    const [producto,setProducto] = useState({})

    useEffect(
        ()=>{
            async function request(){
                try {
                    const document = await firebase.db.doc("productos/"+id)
                    .get()
                    setLoading(false)
                    setProducto(document.data())
                } catch(e) {
                    console.log("error", e)
                }
            }
            request()
        },
        []
    )
    if(loading){
        return(
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }else{
        return(
            <div className='container'>
                <Producto datos={producto} verDetalle={false} />
                <button> <Link to={"/compra"}>Comprar</Link></button>
            </div>
        )
    }
    
}

export default DetallePage;