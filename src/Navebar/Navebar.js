import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import style from './Navebar.module.css'

function Navebar() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem("user"))
    const username = window.localStorage.getItem("name");
    const handleLogout = ()=>{
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("name")
        window.localStorage.removeItem("token")
        setIsLoggedIn(!!window.localStorage.getItem("user"))
        window.location.reload();

    }
   
    return (
        <div className={style.structur}>
            <div className='logopart'>
                <Link to='/Home'><h2>Jobfinder</h2></Link>
            </div>
            <div className='otherpart'>
                
            {isLoggedIn?<>
                    <span onClick={handleLogout} className={style.btnlogin}>Logout</span>
                    <span className={style.loggedInText}>Hello {username}</span>
                </>:
                <>
                <Link to='/Login'><button className={style.btnlogin}>Login up</button></Link>
                <Link to='/Register'><button className={style.btnreg}>Register</button></Link>
                </>
                }
                
            </div>

        </div>
    )
}

export default Navebar
