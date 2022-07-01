import './App.css';
import React, {useEffect} from "react"
import Axios  from 'axios';

function App() {

  const [CarName,setCarName]= React.useState("");
  const [CarModel,setCarModel]= React.useState("");
  const [days,setDays]=React.useState(0);
  const [CarsList,setCarsList]=React.useState([]);
  const [newCarName,setNewCarName]= React.useState("");
  
  useEffect(()=>{
    Axios.get("http://localhost:3001/read").then(response =>{
      setCarsList(response.data);
    })
  })


  const addTolist=()=>{
    Axios.post('http://localhost:3001/insert',{CarName:CarName,CarModel:CarModel,days:days})
  }

  const updateCars=(id)=>{
    Axios.put("http://localhost:3001/update",{id:id,newCarName:newCarName})
  }

  const deleteCars=(id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }
  return (
      <div className='App'>
        <i><h1>Web Application for autombile company</h1></i>   
             <label>Car name:</label>
        <input type="text" onChange={(event)=>{
          setCarName(event.target.value);
        }} />
        <label>Car Model:</label>
        <input type="text" onChange={(event)=>{
          setCarModel(event.target.value);
        }} />
        <label>Days Needed for Service</label>
        <input type="number" onChange={(event)=>{
          setDays(event.target.value);
        }}  />
        <button onClick={addTolist}>Add to list</button>
        <hr/>
        <h1>GRID VIEW</h1>
        {
          CarsList.map((val, key)=>{
            return <div key={key}> 
              <h3>{val.CarName}</h3>
              <h3>{val.CarModel}</h3>
              <h3>{val.daysSinceIAte}</h3>
              <input type="text" placeholder='new Car..'  onChange={(event)=>{
          setNewCarName(event.target.value);
        }} />
              <button onClick={()=>updateCars(val._id)}>Update</button>
              <button onClick={()=>deleteCars(val._id)}>Delete</button>
            </div>
          })
        }
        </div>
    );
}

export default App;
