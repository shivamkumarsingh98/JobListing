import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import style from './Form.module.css'


function Login() {
    const history = useNavigate();

    const [data, setformData] = useState({
        Email: "", Password: ""

    })
    const handleChange = (e) => {
        setformData({ ...data, [e.target.name]: e.target.value })
    }

    const handelSumbit = async (e) => {
        e.preventDefault()
        console.log('Form Data:', data);
        if (data.Email && data.Password) {
            try {
                const backendURL = process.env.REACT_APP_BACKEND_URL
                const response = await axios.post(`${backendURL}/user/Login`, data)
                console.log("login ok", response.data)

                window.localStorage.setItem("user", response.data.newUser)
                window.localStorage.setItem("name", response.data.recruiterName)
                window.localStorage.setItem("token", response.data.token)
               
                history('/Home');
            } catch (error) {
                alert("user not found", error)
            }
        }


    }

    return (
        <div className={style.fullfront}>
            <div className={style.fromblock}>
                <h2 className={style.header}>Create an account</h2>
                <p className={style.paragraf}>Your personal job finder is here</p>
                <form method="post" onSubmit={handelSumbit}>
                    <input type='text' placeholder='Email' name='Email' className={style.enterData} value={data.Email} onChange={handleChange} required/><br />
                    <input type='text' placeholder='Password' name='Password' className={style.enterData} value={data.Password} onChange={handleChange}required /><br />
                    <button className={style.btn} type="submit">Login </button>
                    <p className={style.paragraf}>Already don't have an account?<Link to='/Register' hrefLang='.'>Register</Link></p>
                </form>
            </div>
            <div className={style.imageblock}>

            </div>
        </div>
    )
}

export default Login
