import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

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
type summaryType = {
    continent:string
    count:number
    backgroundColor:string
    color:string
}
const ViewConcerts:React.FC = ()=>{
    const [concerts,setConcerts] = useState<concertType[]>()
    const [summary,setSummary] = useState<summaryType[]>([
        { continent: "Africa", count: 0, backgroundColor: "#FFCDD2", color: "#B71C1C" },
        { continent: "Antarctica", count: 0, backgroundColor: "#E0F7FA", color: "#006064" },
        { continent: "Asia", count: 0, backgroundColor: "#FFF9C4", color: "#F57F17" },
        { continent: "Australia", count: 0, backgroundColor: "#D1C4E9", color: "#4A148C" },
        { continent: "Europe", count: 0, backgroundColor: "#C8E6C9", color: "#1B5E20" },
        { continent: "North America", count: 0, backgroundColor: "#BBDEFB", color: "#0D47A1" },
        { continent: "South America", count: 0, backgroundColor: "#FFE0B2", color: "#E65100" }
    ])
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true'
    const username = sessionStorage.getItem('username')
    
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:8000/concerts')
        .then((res)=>{setConcerts(res.data);return res.data})
        .catch((err)=>console.log(err.response))
        

    },[])

    useEffect(()=>{
        if (!concerts) return;
        let updatesummary = summary.map((ele)=> {
            ele.count=0
            return ele
        })
        console.log(updatesummary)
        concerts.forEach((element:concertType) => {
            let updated_value = updatesummary.findIndex((ele)=> element.continent === ele.continent)
            updatesummary[updated_value].count +=1    
        });
        setSummary(updatesummary)
    },[concerts])


    const concertCardColor = (ele:any)=>{
        let temp = summary.find((e)=> e.continent===ele.continent)
        if (temp) {
            return { backgroundColor: temp.backgroundColor, color: temp.color };
        } else {
            return { backgroundColor: "#fff", color: "#000" };
        }
    }
    
    const handleBuyTicket = (ele:any) =>{
        if (isAuthenticated){
            navigate('/book-tickets/'+ele.id)
        }else{
            navigate('/login')
        }
    }
    return (
        <>
            <h1 className="d-flex justify-content-center">View Concerts</h1>
            <div className="container">
                <div className=" container card">
                    {summary && summary.map((ele,index)=>{
                        return(
                            <div key={index}>
                                <p>{ele.continent}:{ele.count}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="row">
                 {concerts && concerts.map((ele)=>{
                    return(
                        <div key={ele.id} className="col-3 card m-4" style={concertCardColor(ele)}>
                            <div className="d-flex justify-content-center" >
                                <img
                                src={ele.imagepath}
                                width={200}
                                height={200}
                                className="img-fluid"
                                alt={ele.concertName}
                                />
                            </div>
                            <h3>{ele.concertName}</h3>
                            <h5>Artist: {ele.artist}</h5>
                            <h5>Venue: {ele.venue}</h5>
                            <h5>Date: {ele.date}</h5>
                            <h5>Country: {ele.country}</h5>
                            <button onClick={()=> handleBuyTicket(ele)} className="btn btn-primary mb-3">Buy Ticket</button>
                        </div>
                    )
                 })

                 }   

                </div>

            </div>
            
        </>
    )
}

export default ViewConcerts