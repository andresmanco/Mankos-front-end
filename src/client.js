import React, {Component} from 'react'


class Client extends Component{


  render(){
    return(
      <div>
        <h2>{this.props.client.nombre}</h2>
        <h3>Numero de telefono: {this.props.client.telefono}</h3>
        <h2>Numero de compras: {this.props.client.numero_visita}</h2>
        <h3>Direccion: {this.props.client.direccion}</h3>
        <button onClick={this.props.handleCompra}>Compra</button>
      </div>
    )
  }
}
export default Client;
