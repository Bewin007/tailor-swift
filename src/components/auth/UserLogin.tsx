import axios from "axios"
import React, { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

type form_data = {
    username:string,
    password: string
}

const UserLogin:React.FC = () => {
    const [formData,setFormData] = useState<form_data>({username:'',password:''})
    const [formDataError,setFormDataError] = useState<form_data>({username:'',password:''})
    const navigate = useNavigate()
    const [error,setError] = useState<string>()
    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const {name,value,type} = e.target
        const usernameRegex = /[A-Za-z]{3,}/
        setFormData({...formData,[name]:value})
        switch(name){
            case 'username':{
                if (usernameRegex.test(value)){
                    setFormDataError({...formDataError,[name]:''})
                }
                else{
                    setFormDataError({...formDataError,[name]:'Name should contain only Letter and space and Atleast 3 character long'})
                }
                break;
            }

            case 'password':{
                if (value.length >= 8){
                    setFormDataError({...formDataError,[name]:''})
                }
                else{
                    setFormDataError({...formDataError,[name]:'Password must be 8 character long'})
                }
                break;
            }
        }
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        axios.get('http://localhost:8000/user/?email='+formData.username)
        .then((res)=>{
            if (res.data!==''){
                if (res.data[0].password === formData.password){
                    sessionStorage.setItem('isAuthenticated','true')
                    sessionStorage.setItem('username',formData.username)
                    navigate('/home')
                }
                else{
                    // alert('username or password missing')
                    setError('Invalid UserName or password ')
                }
            }
        })
    }
    return (
        <>
            <h1>Individual Login</h1>
            <div className="d-flex justify-content-center align-items-center " >

            <form  onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" id="username" name="username"  className="form-control" value={formData.username} onChange={handleChange}/>
                    <div className="bg-danger">{formDataError.username}</div>
                </div>

                <div>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" name="password"  className="form-control" value={formData.password} onChange={handleChange}/>
                    <div className="bg-danger">{formDataError.password}</div>
                </div>

                <input type="submit" className="btn"  value='Submit'/>
            </form>
            <p>{error}</p>
            </div>
            <Link to='/registration' > I don't have account</Link>

        </>
    
    )

}

export default UserLogin