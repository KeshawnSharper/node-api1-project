import React,{useState,useEffect} from 'react';
import axios from "axios"
import logo from './logo.svg';
import './App.css';

function App() {
  const [data,setData] = useState([])
  const [update,setUpdate] = useState({
    name:"",
    bio:""
  })
  const [id,setId] = useState("")
  useEffect(() => {
    axios.get("http://localhost:4000/api/users")
    .then(res => {
      console.log(res.data)
      setData(res.data.users)}
      )
    
    .catch(err => console.log(err))
  },[])
  const del = id => {
    axios.delete(`http://localhost:4000/api/users/${id}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  const updateData = (e,par) => {
e.preventDefault()
    axios.put(`http://localhost:4000/api/users/${par}`,update)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    setUpdate({name:"",bio:""})
  }
  const addData = e => {
    e.preventDefault()
    axios.post(`http://localhost:4000/api/users`,update)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  return (
    <div className="App">
      {data.map(i => <div key={i.id}><p>{i.name}</p><button onClick={() => del(i.id)}>delete</button></div>)}
      <form onSubmit={(e) => updateData(e,id)}>
        <input value={id} onChange={(e) => setId(e.target.value)} />
        <input value={update.name} onChange={(e) => setUpdate({...update,name:e.target.value})} />
        <input value={update.bio} onChange={(e) => setUpdate({...update,bio:e.target.value})} />
      <button>update</button>
      <button onClick={e => addData(e)}>Add</button>
      </form>
    </div>
  );
}

export default App;
