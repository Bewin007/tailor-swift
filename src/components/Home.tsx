import React from "react"
import { useNavigate } from "react-router-dom"

const Home:React.FC = ()=>{
    const navigate = useNavigate()

    return(
        <>
            <h1>Welcome To My Concert</h1>

            <p>Where you look at the concerts of your favorite artists</p>
            <div className="container">
                <div className="row">
                    <div className="col card m-2">
                        <h1>Your Favorite Artists!</h1>
                        <h4>Know where they perform live</h4>
                        <button className="btn btn-primary mb-2" onClick={()=> navigate('/view-concert')}>View Concerts</button>
                    </div>

                    <div className="col card m-2">
                        <h1>Book Your Tickets Now</h1>
                        <h4> Hurry Before the show is sold out </h4>
                        <button className="btn btn-primary mb-2" onClick={()=> navigate('/view-tickets')}>Book Tickets</button>

                    </div>
                </div>
            </div>

        
        </>
    )
}

export default Home