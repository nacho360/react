import React, {useState,useEffect} from "react"
import Producto from "../Components/Producto"
import {Link} from "react-router-dom"
import firebase from "../Config/firebase"
import Spinner from 'react-bootstrap/Spinner'
import { Button, Container } from "react-bootstrap"

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
            <Container>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }else{
        return(
            <div className='container'>
                <Producto datos={producto} verDetalle={false} />
                <Button> <Link to={"/compra"} style={{textDecoration: 'none', color: 'white'}}>Comprar</Link></Button>
            </div>
        )
    }
    
}

export default DetallePage;