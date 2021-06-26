import React from "react";
import "./style.css";
import axios from 'axios';

const App = () => {
  axios.defaults.headers.common['authorization'] = 1234567890;
  const instance = axios.create({
    baseURL: "https://reqres.in/api",
    timeout: 1000,
    headers: {"x-Custom-Header":"foobar"}
  })

  const instanceData = () => {
    instance.get("/users").then((res) => console.log(res.data))
  };
  const getData = () => {
    axios.get("/users").then(({data: data}) => console.log(data));
  };

  const config = {
    data: {
      name: 'John Doe',
      job: 'Junior Software Developer'
    },
    headers: {
      "content-type": "application/json"
    }
  }

  const postData = () => {
    axios.post("/users", config).then(res => console.log(res.data)).catch(res => console.log(res))
  };
  const updateData = async () => {
    try {
      const res = await axios.put('/2', {
        name: "Jane Doe",
        job: "Senior Developer"
      })
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  };
  const deleteData = () => {
    axios.delete('/2').then(res => console.log(res.status))
  };
  const multiple = () => {
    Promise.all([
      axios.get("https://reqres.in/api/users?page=2"),
      axios.post("https://reqres.in/api/users", config),
    ]).then((res) => console.log(res[0], res[1]));
  };
  return (
    <div className="grid">
      <button style={style} onClick={getData}>Get</button>
      <button style={style} onClick={postData}>Post</button>
      <button style={style} onClick={updateData}>Update</button>
      <button style={style} onClick={deleteData}>Delete</button>
      <button style={style} onClick={instanceData}>Instance</button>
      <button style={style} onClick={multiple}>Multiple</button>
    </div>
  );
}

export default App;

const style = {
  backgroundColor: "black",
  color: "white",
  padding: "4px 8px",
  border: "none",
  borderRadius: "4px",
  display: "block",
  marginBottom: "4px",
  fontWeight: "bold",
};