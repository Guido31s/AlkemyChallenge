import React from "react"
import { useHistory, Link } from "react-router-dom"
import "./NavBar.css"
export const NavBar = () => {
const redirect = useHistory()
const logOut= () => {
    window.localStorage.removeItem("alkemyToken");
    redirect.push("/login")
}
    return (
        <div className="bg-white navBody">
            <Link to="/" className="navBody">
                <div className="mt-5">
                    <h1 className="text-black">Heros App</h1>
                </div>
            </Link>
            {window.localStorage.getItem("alkemyToken")?<button onClick={() => logOut()}>Log Out</button>: null}
        </div>
    )
}
