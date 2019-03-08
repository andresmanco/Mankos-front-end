import React, {Component} from 'react'
import './App.css'

// const apiUrl = 'http://localhost:3000/'
const apiUrl = 'https://mankos-back-end.herokuapp.com/'

class CreateClient extends Component{
  constructor(){
    super()
    this.state={
      nombre: '',
      direccion: ''
    }
  }

  handleChange= (e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  handleClick= ()=>{
    fetch(`${apiUrl}clients`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'accept': 'application.json'
      },
      body: JSON.stringify({
        nombre: this.state.nombre,
        direccion: this.state.direccion,
        telefono: this.props.telefono,
        numero_visita: 1
      })
    })
    .then(r=>r.json())
    .then(client=>{
      this.props.newClient(client)
    })
  }

  render(){
    return(
      <div>
      <input name='nombre' onChange={this.handleChange} value={this.state.nombre} style={{margin: '10px'}} placeholder='Ingrese Nombre'></input>
      <input name='direccion' onChange={this.handleChange} value={this.state.direccion} style={{margin: '10px'}} placeholder='Ingrese Direccion'></input>
      <button onClick={this.handleClick}>Crear Cliente</button>
      </div>
    )
  }
}
export default CreateClient
