import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
const App = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const[modalOpen,setModalOpen]=useState(false);
  const [userData,setUserData]=useState({
    name:"",
    age:"",
    city:""
  })
  useEffect(() => {
    getData();
  }, []);

  

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setData(res.data);
      setFilterData(res.data);
      console.log(res.data);
      console.log("data is:", data);
    } catch (e) {
      console.error(e);
    }
  };

  // filter the data
  const handleSearch = (e) => {
    const searchText = e.target.value;
    const filteredData = data.filter((user) => 
   
        user.name.toLowerCase().includes(searchText) ||
        user.city.toLowerCase().includes(searchText)
        
      )
    setFilterData(filteredData);
  };

  // close the modal
  const handleClose=()=>{
    setModalOpen(false)
  
  }

  //clicking add user
  const handleAdd=()=>{
    setUserData({
 name:"",
 age:"",
 city:""
    })
    setModalOpen(true)

  }

  // get the input from the user
  const handleChange=(e)=>{
    const{name,value}=e.target;
    setUserData({...userData,[name]:value})

  }
  //submit the input
  const handelSubmit= async ()=>{
try{
  if(userData.id){
    const res=await axios.patch(`http://localhost:3000/users/${userData.id}`,userData)
  
    setData([...data,res.data])
    setFilterData([...filterData,res.data])
  }
  else{
    const res=await axios.post(`http://localhost:3000/users`,userData)
  
    setData([...data,res.data])
    setFilterData([...filterData,res.data])
  }
  
  
    setModalOpen(false)
    getData()
}catch(e){
  console.error(e)
}
 
  }

  //delete the data
 const deleteData= async (id)=>{
  const isConfirmed=window.confirm("are you sure to delete?");
  if(isConfirmed){
   try{
       const res=await axios.delete(`http://localhost:3000/users/${id}`)
       
        setData(res.data);
        setFilterData(res.data)
   }catch(e){
    console.error(e)
   }
  }
 
 }

//update the data

const handleUpdate= async (user)=>{
  setUserData(user)
  setModalOpen(true)
// try{
//  setModalOpen(true)
//   const updatedValue= await axios.patch(`http://localhost:3000/users/${user}`)
//   setData(updatedValue.data);
//   setFilterData(updatedValue.data)
// }catch(e){
//   console.error(e)
// }
}


  console.log(data)
  return (
    <div>
      <div className="container">
        <h1>CRUD OPERATION</h1>
        <div>
          <div className="input-search">
            <input
              type="search"
              name=""
              id=""
              placeholder="search name or city here"
              onChange={handleSearch}
            />
            <button className="btn green" onClick={handleAdd}>Add Record</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterData &&
              filterData.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td>
                      {" "}
                      <button className="btn green" onClick={()=>handleUpdate(user)}>Edit</button>
                    </td>
                    <td>
                      {" "}
                      <button className="btn red" onClick={()=>deleteData(user.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {modalOpen&& <div className="overlay">
        <div className="modal">
          <h3>{userData.id?"Update User":"Add User"}</h3>
          <span onClick={handleClose}>x</span>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={userData.name} onChange={handleChange}/>
          </div>
          <div className="input-group">
            <label htmlFor="age">Age</label>
            <input type="text" name="age"value={userData.age} onChange={handleChange}/>
          </div>
          <div className="input-group">
            <label htmlFor="city">City</label>
            <input type="text" name="city"value={userData.city} onChange={handleChange}/>
          </div>
          <button className="btn green" onClick={handelSubmit}>{userData.id?"Update User":"Add User"}</button>
        </div>
      </div>}
      
    </div>
  );
};

export default App;
