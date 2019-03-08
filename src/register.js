import React, { Component } from 'react';
import Client from './client'
import CreateClient from './create-client'

// const apiUrl = 'http://localhost:3000/'
const apiUrl = 'https://mankos-back-end.herokuapp.com/'

class Register extends Component {
  constructor(){
    super()
    this.state={
      id: '',
      telefono: '',
      direccion: '',
      nombre:'',
      numero_visita:'',
      check: null
    }
  }

  handleChange =(e)=>{
    this.setState({
      telefono: e.target.value,
      check: null
    })
  }

  handleCompra = ()=>{
    fetch(`${apiUrl}clients/${this.state.id}`, {
      method: "DELETE"
    })
    .then(()=>{
      fetch(`${apiUrl}clients`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept': 'application.json'
        },
        body: JSON.stringify({
          id: this.state.id,
          nombre: this.state.nombre,
          direccion: this.state.direccion,
          telefono: this.state.telefono,
          numero_visita: parseInt(this.state.numero_visita)+1
        })
      }).then(r=> r.json())
      .then(client=>{
        this.setState({
          check: true,
          numero_visita: client.numero_visita
        })
      })})
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    fetch(`${apiUrl}clients`)
    .then(r=>r.json())
    .then(json => {
      console.log(json)
      let check = false
      json.forEach(client=>{
        console.log(client.telefono);
        if(client.telefono == this.state.telefono){
          check = true
          this.setState({
            nombre: client.nombre,
            direccion: client.direccion,
            numero_visita: client.numero_visita,
            id: client.id,
            check: true
          })
        }
      })
      if(!check){
        this.setState({
          check: false
        })
      }
    })
  }

  newClient= (client)=>{
    this.setState({
      nombre: client.nombre,
      direccion: client.direccion,
      telefono: client.telefono,
      numero_visita: client.numero_visita,
      check: true
    })
  }


  render () {
    return (
      <div style={{margin: '15px'}}>
        <title>Registro</title>
        <h1>Registro de clientes</h1>
        <h3>Ingresar numero de telefono</h3>
        <form onSubmit={this.handleSubmit}>
          <input style={{margin: '5px'}} name='telephone' onChange={this.handleChange} value={this.state.telefono} placeholder='Numero de telefono'></input>
          <button type='submit'>Buscar</button>
        </form>
        {this.state.check ? <Client handleCompra={this.handleCompra} client={this.state}/> :
         (this.state.check === false ? <CreateClient newClient={this.newClient} telefono={this.state.telefono}/> : null)}
      </div>
    )
  }
}

export default Register;
