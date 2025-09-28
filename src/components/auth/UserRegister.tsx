import axios from "axios"
import React, { ChangeEvent, FormEvent, useState } from "react"
import { data, Link, useNavigate } from "react-router-dom"

type form_data = {
    username:string,
    password: string,
    confirm_password:string,
    email:string,
    dob:string,

    city:string,
    continents:string,
    Country:string
}
const UserRegister:React.FC = () => {

    const [formData,setFormData] = useState<form_data>({username:'',password:'',confirm_password:'',email:'',city:'', dob:'',continents:'',Country:''})
    const [formDataError,setFormDataError] = useState<form_data>({username:'',password:'',confirm_password:'',email:'',city:'', dob:'',continents:'',Country:''})
    const [sucess,setSucess] = useState<string>()
    const [error,setError] = useState<string>()
    const navigate = useNavigate()
    const validate = (name:string,value:string,type:string) => {
        const usernameRegex = /[A-Za-z]{3,}/
        const cityRegex = /[A-Za-z]{2,}/
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

            case 'confirm_password':{
                if (value == formData.password){
                    setFormDataError({...formDataError,[name]:''})
                }
                else{
                    setFormDataError({...formDataError,[name]:'Password and Confirm password must be similar'})
                }
                break;
            }

            case 'city':{
                if (cityRegex.test(value)){
                    setFormDataError({...formDataError,[name]:''})
                }
                else{
                    setFormDataError({...formDataError,[name]:'City must contain at least 2 letters '})
                }
                break;
            }

            case 'email':{
                const emailRegex = /[\w.-]+@[\w.-]+\.[\w]{2,}/
                if (emailRegex.test(value)){
                    setFormDataError({...formDataError,[name]:''})
                }
                else{
                    setFormDataError({...formDataError,[name]:'Enter a valid email'})
                }
                break;
            }
            case 'dob':{
                // let date = new Date(value)
                // let current_date = new Date
                // console.log(Number(date.getFullYear()) -Number(current_date.getFullYear()))
                if (new Date(value) <= new Date()){
                        setFormDataError({...formDataError,[name]:''})
                }
                else{
                    setFormDataError({...formDataError,[name]:'Did you born in future'})
                }
                break;   

            }
        }
    }

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value,type} =  e.target
        validate(name,value,type)
        setFormData({...formData,[name]:value})

    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        let error_Verify = Object.values(formDataError).some((ele)=> {
            if (ele!==''){
                return true
            }
        })
        let data_Verify = Object.values(formData).some((ele)=> {
            if (ele ===''){
                console.log(ele)
                return true
            }
        })
        console.log(error_Verify,data_Verify)
        if (error_Verify === false && data_Verify ===false){
            axios.post('http://localhost:8000/user',formData)
            .then((res)=>{
                setSucess('Sucessfully Registed')
                navigate('/login')
                
            }).catch(()=>{
                setError('Some thing went wrong try again')
            })
        }
        else{


            alert('you have some unfinished data')

        }
            // console.log(error_Verify
    }
    return (
        <>
            <h1>Individual Register</h1>
            <div className="d-flex justify-content-center align-items-center ">

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

                <div>
                    <label htmlFor="confirm_password" className="form-label">Confirm password</label>
                    <input type="password" id="confirm_password" name="confirm_password"  className="form-control" value={formData.confirm_password} onChange={handleChange}/>
                    <div className="bg-danger">{formDataError.confirm_password}</div>
                </div>



                <div>
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="text" id="email" name="email"  className="form-control" value={formData.email} onChange={handleChange}/>
                    <div className="bg-danger">{formDataError.email}</div>
                </div>



                <div>
                    <label htmlFor="dob" className="form-label">Organization Name</label>
                    <input type="date" id="dob" name="dob"  className="form-control" value={formData.dob} onChange={handleChange}/>
                    <div className="bg-danger">{formDataError.dob}</div>
                </div>

                <div>
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" id="city" name="city"  className="form-control" value={formData.city} onChange={handleChange}/>
                    <div className="bg-danger">{formDataError.city}</div>
                </div>

                <div>
                    <label htmlFor="continents" className="form-label">continents</label>
                    <input type="text" id="continents" name="continents"  className="form-control" value={formData.continents} onChange={handleChange}/>
                    <div className="bg-danger">{formDataError.continents}</div>
                </div>

                <div>
                    <label htmlFor="Country" className="form-label">Country</label>
                    <input type="text" id="Country" name="Country"  className="form-control" value={formData.Country} onChange={handleChange}/>
                    <div className="bg-danger">{formDataError.Country}</div>
                </div>

                <input type="submit" className="btn"  value='Submit'/>
            </form>
            </div>
            <Link to='/login' > I already have account</Link>

                <p>{error}</p>
                <p>{sucess}</p>
        </>
    )

}

export default UserRegister