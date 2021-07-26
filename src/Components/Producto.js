import React from "react"
import {Link} from "react-router-dom"
import {Card, Button} from 'react-bootstrap'
function Producto(props){
    const {datos} = props
    const {name,description,price,id} = datos

    const verDetalle = (props.verDetalle!==false?true:false)
    const modificar = (props.modificar===true?true:false)
    const eliminar = (props.modificar===true?true:false)

    return(
        <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          {
                verDetalle &&
                <Button><Link to={"/producto/"+id}>Ver Detalle</Link></Button>
            }
            {
                modificar &&
                <Button onClick={(e)=> props.clickModificar(datos)}>Modificar</Button>
            }
            {
                eliminar &&
                <Button onClick={(e)=> props.clickEliminar(datos)}>Eliminar</Button>
            }
        </Card.Body>
      </Card>
    )
}
export default Producto