import React from "react"
import { useHistory, Link } from "react-router-dom"

export const NavBar = () => {
const redirect = useHistory()
const logOut= () => {
    window.localStorage.removeItem("alkemyToken");
    redirect.push("/login")
}
    return (
        <div>
            <Link to="/">
                <div>
                    <h1>Heros</h1>
                    <h1>App</h1>
                </div>
            </Link>
            {window.localStorage.getItem("alkemyToken")?<button onClick={() => logOut()}>Log Out</button>: null}
        </div>
    )
}
