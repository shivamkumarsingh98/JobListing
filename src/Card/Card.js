import React from 'react'
import style from './Card.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Card() {

    let navigate = useNavigate()
    const [jobset, setjob] = useState([])
    const [skill, setSkills] = useState([])
    const [search, setSearch] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem("token"))
    const backendURL = process.env.REACT_APP_BACKEND_URL

    const handelserch = (e) => {
        setSearch(e.target.value)
    }
    


    useEffect(() => {
        if (search.length > 0) {
            const arr = jobset.filter(job => job?.position?.toLowerCase().includes(search.toLowerCase()))
           
            setjob([...arr]);
        }
        else {
            
            axios.get(`${backendURL}/api/job-post?skills=`)
                .then((response) => {
                    setjob([...response.data.jobdata])
                })
                .catch((err) => {
                    console.log("err 3", err)
                })

        }
    }, [search])


    const handelskills = (e) => {
        const skillValue = e.target.value.toLowerCase();
        if (!skill.includes(skillValue))
            setSkills((prev) => [...prev, skillValue])
    };

    const handleRemove = (selectedSkill)=>{
        const index = skill.indexOf(selectedSkill);
        if (index !== -1) {
            const updatedSkills = [...skill];
            updatedSkills.splice(index, 1);
            setSkills(updatedSkills);
        }
    }
    

    useEffect(() => {
        
        const search = skill.join("&").toLowerCase()
        axios.get(`${backendURL}/api/job-post?skills=${search}`)

            .then((response) => {
                
                setjob([...response.data.jobdata])
            })

            .catch(err => console.log("4",err));
            
    }, [skill])




    useEffect(() => {
        axios.get(`${backendURL}/api/job-post`).then((res) => {
            if (res.data && Array.isArray(res.data.jobdata)) {
                setjob(res.data.jobdata);
            } else {
                console.error("Invalid data format:", res.data);
            }
        })
            .catch((error) => {
                console.error("Error fetching 2", error)
            })
    }, [])
    const codingSkills = [
        'JavaScript',
        'Python',
        'Java',
        'C++',
        'Ruby',
        'PHP',
        'Swift',
        'Objective-C',
        'SQL',
        'HTML',
        'CSS',
        'css',
        "node",
        "react"
    ];



    return (
        <>
            <div className={style.box}>
                <div className={style.searchbox}>

                    <input 
                    type='search'
                    name='search'
                    value={search}
                    onChange={handelserch}
                    placeholder='search'
                    className={style.searchnav} 
                     />
                </div>
                <div className={style.searchskill}>
                <div >
                    <select onChange={handelskills} className={style.skillbtn} name='remote'>
                        <option value="">Skills</option>
                        {codingSkills.map((skill) => (
                            <option key={skill} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>
                    {skill.map((skill)=>{
                        return (
                            <span
                             className={style.chip}
                             key={skill}>{skill}
                              <span
                            onClick={()=>handleRemove(skill)}
                            className={style.cross}>X</span></span>
                        )
                    }
                    )}
                     
                </div>
                <div className={style.creatjob}>

                {isLoggedIn ? <>
                    <button onClick={() => navigate('/Jobcreat')} type="button" className={style.btn} >Create Job</button>
                </> :
                    <></>
                }
                 </div>
                 </div>
            </div>
            {jobset.map(job => (

                <div key={job._id} className={style.cardouter}>
                    <div className={style.cardinerone}>
                        <div >
                            <img alt="Job Image" src={job.logourl} className={style.image} />
                        </div>
                        <div>
                            <p className={style.headingtab}>{job.position}</p>
                            <div className={style.btntabone}>
                            <span>11-50</span>
                            <span>{job.salary}</span>
                            </div>
                            <div className={style.btntabthree}>
                            <span>{job.worktype}</span> 
                            <span>{job.jobtype}</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.cardinertwo}>
                        <div>
                            {job.skills.map(skill => (
                                <input key={skill} type='button' className={style.skillbit} value={skill} />
                            ))}
                        </div>
                        <div className={style.vieweditbtn}>
                        {isLoggedIn ? <>
                            <button onClick={() => navigate(`/Jobcreat`, { state: { id: job._id , edit:true} })} className={style.editbtn}>Edit</button>
                        </> :
                            <></>
                        }

                        <button onClick={() => navigate(`/Jobdetails`, { state: { id: job._id } })} className={style.btn}>View details</button>
                        </div>

                    </div>

                </div>

            ))}
        </>

    )
}

export default Card
