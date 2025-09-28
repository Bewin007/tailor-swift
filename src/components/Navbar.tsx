import React from "react"
import { Link, useNavigate } from "react-router-dom"

const Navbar:React.FC = ()=>{
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true'
    const username = sessionStorage.getItem('username')
    
    const navigate = useNavigate()
    const logout = ()=>{
        sessionStorage.clear()
        navigate('/login')
    }
    
    return (
        <>
            <nav className="navbar navbar-expand-lg">
               <div className="container-fluid">
                <div className="navbar-collapse collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to='/'>Home</Link>

                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/view-concert'>Concerts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/view-tickets'>Tickets</Link>
                        </li>

                        {!isAuthenticated ?
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to='/login'>Login</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to='/registration'>Register</Link>
                            </li>
                        </>:<>
                            <li className="nav-item">
                                <button className="nav-link" onClick={logout} >Logout</button>
                                {/* <Link className="nav-link" to='/registration'>Register</Link> */}
                            </li>
                        </>
                        }
                    </ul>
                </div>
               </div>

            </nav>
        </>
    )
}

export default Navbar