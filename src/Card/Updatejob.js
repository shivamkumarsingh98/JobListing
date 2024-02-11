import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import style from './Updatejob.module.css'

function Updatejob() {
  const { state } = useLocation();
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(null)
  const [data, setdata] = useState({
    name: "",
    logourl: "",
    position: "",
    salary: "",
    jobtype: "",
    worktype: "",
    location: "",
    description: "",
    about: "",
    skills: "",
    information: ""
  })

  useEffect(()=>{
    const { id, edit } = state;
    console.log("ID from state:", id);
  console.log("Edit from state:", edit);
    if(edit){
        setEdit(edit)
    }
    if(id){
        setId(id)
        const options = {method: 'GET'};
        fetch(`http://localhost:8080/create/job-post/${id}`, options)
        .then(response => response.json())
        .then(response => setdata(console.log("API Response:", response),response.jobpost))
        .catch(err => console.error(err));
    }
  },[state])
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }

  const handelSumbit = async (e) => {
    e.preventDefault()

    let response = await axios.post(`http://localhost:8080/create/jobpost`, data)
      .then((res) => {
        console.log("data save to data base", response.data);
        console.log("res", res)

      }).catch((err) => {
        console.log("ree", err)
      })
  }
  const token = window.localStorage.getItem("token");
  const recruiterName = window.localStorage.getItem("name")

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  const handleEdit = async (event) => {
    event.preventDefault();
    if (
      !data.name ||
      !data.logourl ||
      !data.position ||
      !data.salary ||
      !data.jobtype ||
      !data.worktype ||
      !data.location ||
      !data.description ||
      !data.about ||
      !data.skills
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (!token) {
      alert("Login to create a job")
      return
    }
    const formData = { ...data, name: recruiterName }
    try {
    let response =   axios.put(`http://localhost:8080/create/job-post/${id}`,formData, config)
        console.log(response.data.jobpost)
          setEdit(response.data.jobpost)
          alert("Job edited successfully")
          

    } catch (error)  {
    console.log("error:", error)
  }
}



return (
  <div className={style.box}>
    <div className={style.boxone}>
      <h3>Add job description</h3>
      <form method="post" action="/Home" onSubmit={handelSumbit}>
      <h1>{edit?<>Edit</>:<>Add</>} job description</h1>
        <div className={style.textes}>
          <p>Company Name :</p>
          <input type='text' placeholder='text' name='name' value={data && data.name} className={style.texte} onChange={handleChange} /><br />
        </div>
        <div className={style.textes}>
          <p>Add logo Url :</p>
          <input type='text' placeholder='text' name='logourl' value={data &&data.logourl} className={style.texte} onChange={handleChange} /><br />
        </div>
        <div className={style.textes}>
          <p>Job Position :</p>
          <input type='text' placeholder='text' name='position' value={data &&data.position} className={style.texte} onChange={handleChange} /><br />
        </div >
        <div className={style.textes}>
          <p>Monthly salary:</p>
          <input type='text' placeholder='text' name='salary' value={data &&data.salary} className={style.texte} onChange={handleChange} /><br />
        </div>
        <div className={style.textes}>
          <p>Job Type:</p>
          <input type='text' placeholder='text' name='jobtype' value={data &&data.jobtype} className={style.texte} onChange={handleChange} /><br />
        </div>
        <div className={style.textes}>
          <p>Remote/office:</p>
          <input type='text' placeholder='text' name='worktype' value={data &&data.worktype} className={style.texte} onChange={handleChange} /><br />
        </div>
        <div className={style.textes}>
          <p>Location:</p>
          <input type='text' placeholder='text' name='location' value={data &&data.location} className={style.texte} onChange={handleChange} /><br />
        </div>
        <div className={style.textes}>
          <p>Job Description:</p>
          <textarea type='text' placeholder='text' name='description' value={data &&data.description} className={style.texte} onChange={handleChange} /><br />
        </div>
        <div className={style.textes}>
          <p>About Company:</p>
          <textarea type='text' placeholder='text' name='about' value={data &&data.about} className={style.texte} onChange={handleChange} /><br />
        </div>
        <div className={style.textes}>
          <p>Skills Required:</p>
          <input type='text' placeholder='text' name='skills' value={data &&data.skills} className={style.texte} onChange={handleChange} /><br />
        </div>
        <div className={style.textes}>
          <p>Information:</p>
          <input type='text' placeholder='text' name='information' value={data && data.information} className={style.texte} onChange={handleChange} /><br />
        </div>
        <Link to='/Home'><button>Cancel</button></Link>
        {edit?
    <button onClick={handleEdit} >Edit Job</button>
    : <button type='submit' >+ Add Job</button>
}
        
      </form>
    </div>
    <div className={style.boxtwo}>

    </div>
  </div>
)
}

export default Updatejob
