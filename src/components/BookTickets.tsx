import axios from "axios"
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

type formDataType = {
    concertid:string | undefined,
    userName : string,
    phoneNumber: string,
    email: string,
    // password: string,
    numberOfTicket : number,
    date: string,
}

type formDataErrorType = {
    userName : string,
    phoneNumber: string,
    email: string,
    // password: string,
    numberOfTicket : string,
    date: string,
}

type concertType =     {
      id:number,
      concertName:string,
      imagepath: string,
      artist: string,
      venue: string,
      date: string,
      country: string,
      continent: string
    }
const BookTickets:React.FC = ()=>{
    const {concertid}  = useParams()


    
    const [formData,setFormData] = useState<formDataType>({concertid:concertid, userName:'',numberOfTicket:0,phoneNumber:'',email:'',date:new Date().toISOString().split("T")[0]})
    const [formDataError,setFormDataError] = useState<formDataErrorType>({userName:'',numberOfTicket:'',phoneNumber:'',email:'',date:''})
    const [concert,setConcert] = useState<concertType>()
    const [sucess,setSucess] = useState<string>()
    const [error,setError] = useState<string>()
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('http://localhost:8000/concerts/?id='+concertid)
        .then((res)=>{
            if (res.data !=='' && new Date (res.data[0].date) > new Date() ){
                setConcert(res.data)
            }
            else{
                // console.log(res.data[0])
                alert('Hey this concert seems expired')
                setTimeout(() => {
                    navigate('/')
                }, 3000);
            }

            
        })
        .catch(res => console.log(res))
    },[])


    const validate = (name:string,value:string,type:string) => {
        const usernameRegex = /[A-Za-z]{3,}/
        const cityRegex = /[A-Za-z]{2,}/
        switch(name){
            case 'userName':{
                if (usernameRegex.test(value)){
                    setFormDataError({...formDataError,userName:''})
                }
                else{
                    setFormDataError({...formDataError,userName:'Name should contain only Letter and space and Atleast 3 character long'})
                }
                break;
            }

            case 'numberOfTicket':{
                if (Number(value) > 0){
                    setFormDataError({...formDataError,numberOfTicket:''})
                }
                else{
                    setFormDataError({...formDataError,numberOfTicket:'Enter the valid count'})
                }
                break;
            }
            case 'phoneNumber':{
                const phoneNumberRegex = /\d{10}/
                // console.log(phoneNumberRegex.test(value))

                if (phoneNumberRegex.test(value)){
                    setFormDataError({...formDataError,phoneNumber:''})

                }
                else{
                    setFormDataError({...formDataError,phoneNumber:'Enter the valid Phone Number'})
                }
                break;
            }

            case 'email':{
                // console.log(1)
                const emailRegex = /[\w.-]+@[\w.-]+\.[\w]{2,}/
                if (emailRegex.test(value)){
                    setFormDataError({...formDataError,[name]:''})
                }
                else{
                    setFormDataError({...formDataError,[name]:'Enter the valid email'})
                }
                break;
            }
        }
    }

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value,type} =  e.target
        validate(name,value,type)
        setFormData({...formData,[name]:value})
        console.log(formDataError)


    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        let error_Verify = Object.values(formDataError).some((ele) => {
            if (ele!==''){
                console.log(ele)
                return true
            }
            else
                return false
        })
        if (error_Verify){
            alert('you have some unfinished data')

        }else{
            // console.log(formData)
            axios.post('http://localhost:8000/booking',formData).then((ele:any)=>setSucess(`Booking Sucessful \n your id is: ${ele.data.id}`)).catch(()=>setError('Something went wrong please try after some time'))
        }   
        console.log(error_Verify)
    }

    return (
        <>

            <h1>BookTickets</h1>
            <div className="container">

            </div>
            <div className="container">
                <form className="form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="userName" className="form-label">User Name</label>
                        <input type="text" value={formData.userName} className="form-control" id="userName" name="userName" onChange={handleChange}/>
                        <div >{formDataError.userName}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input  type="text" value={formData.phoneNumber} className="form-control" id="phoneNumber" name="phoneNumber" onChange={handleChange}/>
                        <div >{formDataError.phoneNumber}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">email</label>
                        <input type="text" value={formData.email} className="form-control" id="email" name="email" onChange={handleChange}/>
                        <div >{formDataError.email}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="numberOfTicket" className="form-label">numberOfTicket</label>
                        <input type="number" value={formData.numberOfTicket} className="form-control" id="numberOfTicket" name="numberOfTicket" onChange={handleChange}/>
                        <div >{formDataError.numberOfTicket}</div>
                    </div>
                    <input type="submit" value={'submit'} />
                </form>

                <p>{error}</p>
                <p>{sucess}</p>

            </div>

        </>
    )
}

export default BookTickets