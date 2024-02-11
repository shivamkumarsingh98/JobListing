import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import style from './Jobcreat.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'




function Jobcreat() {
  const navigate = useNavigate();
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
  const backendURL = process.env.REACT_APP_BACKEND_URL

  useEffect(()=>{
    const { id, edit } = state || {};
    console.log("ID from state:", id);
  console.log("Edit from state:", edit);
    if(edit){
        setEdit(edit)
    }
    if(id){
        setId(id)
        const options = {method: 'GET'};
        fetch(`${backendURL}/api/job-post/${id}`, options)
        .then(response => response.json())
        .then(response => setdata(console.log("API Response:", response),response.jobpost))
        .catch(err => console.log("5",err));
    }
  },[state])
  const token = window.localStorage.getItem("token");
  const recruiterName = window.localStorage.getItem("name")

  

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

 
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }

  const handelSumbit = async (e) => {
    e.preventDefault()


    if (!token) {
      alert("Login to create a job")
      return
    }

    let response = await axios.post(`${backendURL}/api/jobpost`, data, config)
      .then((res) => {
        console.log("data save to data base", response.data);
        console.log("res", response)
        
      }).catch((err) => {
        console.log("ree 6", err)
      })
      alert('Job add sussesfull complet')
        navigate('/Home')


  }
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
    let response =  await axios.put(`${backendURL}/api/job-post/${id}`,formData, config)
        console.log(response.data.jobpost)
          setEdit(response.data.jobpost)
          alert("Job edited successfully")
          navigate('/Home')

    } catch (error)  {
    console.log("error: 7", error)
  }
}


  return (
    <div className={style.box}>
      <div className={style.boxone}>
        <h3>Add job description</h3>
        <form method="post" action="/Home" onSubmit={handelSumbit}>
        <h1>{edit?<>Edit</>:<>Add</>} job description</h1>
          <div className={style.textes}>
            <label htmlFor="name">Company Name :</label>
            <div className={style.textes}>
              <input type='text' placeholder='text' name='name' value={data &&data.name} className={style.texte} onChange={handleChange} required  /><br />
            </div>
          </div>
          <div className={style.textes}>
            <label>Add logo Url :</label>
            <div className={style.textes}>
              <input type='text' placeholder='text' name='logourl' value={data &&data.logourl} className={style.texte} onChange={handleChange} required /><br />
            </div>
          </div>
          <div className={style.textes}>
            <label>Job Position :</label>
            <div className={style.textes}>
              <input type='text' placeholder='text' name='position' value={data &&data.position} className={style.texte} onChange={handleChange} required  /><br />
            </div >
          </div>
          <div className={style.textes}>
            <label>Monthly salary:</label>
            <div className={style.textes}>
              <input type='text' placeholder='text' name='salary' value={data &&data.salary} className={style.texte} onChange={handleChange} required  /><br />
            </div>
          </div>
          <div className={style.textes}>
            <label>Job Type:</label>
            <div className={style.textes}>

              <select name='jobtype' value={data &&data.jobtype} className={style.texte} onChange={handleChange} required >
                <option value="">Job type</option>
                <option value="Full time">Full time</option>
                <option value="Internship">Internship</option>
                <option value="Partime">Partime</option>
              </select>
              <br />
            </div>
          </div>
          <div className={style.textes}>
            <label>Work type:</label>
            <div className={style.textes}>
              <select name='worktype' value={data &&data.worktype} className={style.texte} onChange={handleChange} required >
                <option value="">Type</option>
                <option value="Office">Office</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <br />
            </div>
          </div>
          <div className={style.textes}>
            <label>Location:</label>
            <div className={style.textes}>
              <input type='text' placeholder='text' name='location' value={data &&data.location} className={style.texte} onChange={handleChange}required  /><br />
            </div>
          </div>
          <div className={style.textes}>
            <label>Job Description:</label>
            <div className={style.textes}>
              <textarea type='text' placeholder='text' name='description' value={data &&data.description} className={style.text} onChange={handleChange}required  /><br />
            </div>
          </div>
          <div className={style.textes}>
            <label>About Company:</label>
            <div className={style.textes}>
              <textarea type='text' placeholder='text' name='about' value={data &&data.about} className={style.text} onChange={handleChange}required  /><br />
            </div>
          </div>
          <div className={style.textes}>
            <label>Skills Required:</label>
            <div className={style.textes}>
              <input type='text' placeholder='text' name='skills' value={data &&data.skills} className={style.texte} onChange={handleChange}required  /><br />
            </div>
          </div>
          <div className={style.textes}>
            <label>Information:</label>
            <div className={style.textes}>
              <input type='text' placeholder='text' name='information' value={data &&data.information} className={style.texte} onChange={handleChange}required  /><br />
            </div>
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


export default Jobcreat
