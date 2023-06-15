import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';



function App() {

  const [userName,setUserName] = useState('')
  const [isadmin,setIsAdmin] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const [listaUsuarios,setlistaUsuarios] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:3001/api/usuario").then((response)=>{
      setlistaUsuarios(response.data)
    })
  },[])

  const enviarDatos = () =>{
    axios.post('http://localhost:3001/api/usuario/insert',{
      userName : userName,
      isadmin : isadmin, 
      password : password,
      email : email}).then(()=> {
        alert("envio de datos exitoso")
      })
  }

  return (
    <div className="App">
      <ul>
        <li>
          <label for="name">Nombre:</label>
          <input type="text" name="userName" onChange={(e) => {
            setUserName(e.target.value)
          }}/>
        </li>
        <li>
          <label for="mail">Correo electrónico:</label>
          <input type="email" id="mail" name="user_mail" onChange={(e) => {
            setEmail(e.target.value)
          }}/>
        </li>
        <li>
         <label for="chkisadmin">Es administrador?</label>
         <input type="checkbox" id="chkisadmin" value="true" onChange={(e) => {
            setIsAdmin(e.target.value)
          }}/>
        </li>
        <li>
          <label for="pwd">Password:</label>
          <input type="password" id="pwd" name="pwd" onChange={(e) => {
            setPassword(e.target.value)
          }}/>
        </li>
      </ul>
      <button type="button" onClick={enviarDatos}>Enviar</button>
      {listaUsuarios.map((user)=>{
        return <h2> Nombre usuario : {user.NOMBRE_USUARIO} | email usuario : {user.EMAIL_USUARIO}</h2>
      })}
    </div>
  );
}

export default App;
