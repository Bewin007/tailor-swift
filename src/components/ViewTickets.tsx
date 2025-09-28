import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type bookingdataType = {
    id:String,
    concertid:string ,
    userName : string,
    phoneNumber: string,
    email: string,
    // password: string,
    numberOfTicket : number,
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
type dataType = {
    concert:concertType,
    booking:bookingdataType
}
const ViewTickets:React.FC = ()=>{
    const [Bookings,setBookings] = useState<dataType[]>([])
    const username = sessionStorage.getItem('username')
    
    const [sucess,setSucess] = useState<string>()
    const [error,setError] = useState<string>()
    const navigate = useNavigate()
    
    const fetch = async() =>{
        let bookingResponse = await axios.get('http://localhost:8000/booking/?email='+username)


        if(bookingResponse.status === 200){
            let temp =  bookingResponse.data.map(async(ele:any)=>{
                let test = await axios.get('http://localhost:8000/concerts/?id='+ele.concertid)
                    return ({
                        concert:test.data[0],
                        booking: ele
                    })
            })
            
            setBookings(await Promise.all(temp))
        }
        else{
            console.log(bookingResponse.data)
        }
    }
    useEffect(()=>{
        fetch()
    },[])
    

    // console.log(Bookings)
    return (
        <>
            <h1>ViewTickets</h1>


                <div className="row">
                 {Bookings && Bookings.map((ele,index)=>{
                    // console.log(ele)
                    return(
                        <div key={index} className="col-3 card m-4">
                            <div className="d-flex justify-content-center" >
                                <img
                                src={ele.concert.imagepath}
                                width={200}
                                height={200}
                                className="img-fluid"
                                alt={ele.concert.concertName}
                                />
                            </div>
                            <h3>Booking {ele.booking.id}</h3>

                            <h3>{ele.concert.concertName}</h3>
                            <h5>Artist: {ele.concert.artist}</h5>
                            <h5>Venue: {ele.concert.venue}</h5>
                            <h5>Date: {ele.concert.date}</h5>
                            <h5>ph no:{ele.booking.phoneNumber}</h5>
                            <h5>Booking Date: {ele.booking.date}</h5>
                            <h5>No of Ticket: {ele.booking.numberOfTicket}</h5>
                            
                            
                            {/* <button onClick={()=> viewConcert} className="btn btn-primary mb-3">View Concert</button> */}
                        </div>
                    )
                 })

                 }   

                </div>

                <p>{error}</p>
                <p>{sucess}</p>
        </>
    )
}

export default ViewTickets