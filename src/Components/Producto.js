import React from "react"
import {Link} from "react-router-dom"
import {Card, Button} from 'react-bootstrap'

const button = {
  style: {
    color: 'white',
    display: 'inline-block',
    margin: '5px'
  }
}

function Producto(props){
    const {datos} = props
    const {name,description,price,id} = datos

    const verDetalle = (props.verDetalle!==false?true:false)
    const modificar = (props.modificar===true?true:false)
    const eliminar = (props.modificar===true?true:false)

    return(
        <Card style={{ width: '25rem', margin: '10px', display: 'inline-block' }}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              Descripcion: {description}
            </Card.Text>
            <Card.Text>
              Precio: ${price}
            </Card.Text>
            {
                  verDetalle &&
                  <Button><Link to={"/producto/"+id} style={{textDecoration: 'none', color: 'white'}}>Ver Detalle</Link></Button>
              }
              {
                  modificar &&
                  <Button style={button.style} onClick={(e)=> props.clickModificar(datos)}>Modificar</Button>
              }
              {
                  eliminar &&
                  <Button style={button.style} onClick={(e)=> props.clickEliminar(datos)}>Eliminar</Button>
              }
          </Card.Body>
        </Card>
    )
}
export default Producto