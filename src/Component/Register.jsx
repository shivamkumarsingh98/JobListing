import React from 'react'
import style from './Form.module.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';



function Register() {
  const history = useNavigate();
  const [formData, setformData] = useState({
    Name: '', Email: '', Mobile: '', Password: ''
  })
  const [checked, setChecked] = useState(false)
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handelSumbit = async (e) => {
    e.preventDefault()
    setChecked(!checked)
    if (formData.Mobile.length !== 10) {
      alert("please enter valid number")
      return
    }
    try {
      const backendURL = process.env.REACT_APP_BACKEND_URL
      const response = await axios.post(`${backendURL}/user/register`, formData)
      console.log("data save to data base", response.data);

      window.localStorage.setItem("user", response.data.newUser)
      window.localStorage.setItem("name", response.data.recruiterName)
      window.localStorage.setItem("token", response.data.token)

      setformData({
        Name: '',
        Email: '',
        Mobile: '',
        Password: ''
      })
      history('/Home');
    } catch (err) {
      alert('somthing worng', err);
    };

  }

  return (
    <div className={style.fullfront}>

      <div className={style.fromblock}>
        <h2 className={style.header}>Create an account</h2>
        <p className={style.paragraf}>Your personal job finder is here</p>
        <form method="post" action="/Home" onSubmit={handelSumbit}>
          <input type='text' placeholder='name' className={style.enterData} name='Name' value={formData.Name} onChange={handleChange} required /><br />
          <input type='text' placeholder='Email' className={style.enterData} name='Email' value={formData.Email} onChange={handleChange} required /><br />
          <input type='text' placeholder='Mobile' className={style.enterData} name='Mobile' value={formData.Mobile} onChange={handleChange} required /><br />
          <input type='text' placeholder='Password' className={style.enterData} name='Password' value={formData.Password} onChange={handleChange} required /><br />
          <input type='checkbox' checked={checked} onChange={handelSumbit} className={style.checkbox} /><br />
          <button className={style.btn} type="submit" >Create account</button>
          <p className={style.paragraf}>Already have an account?<Link to='/Login' hrefLang='.'>Login</Link></p>

        </form>
      </div>
      <div className={style.imageblock}>

      </div>
    </div>
  )
}

export default Register
