import React from "react"
import { useHistory} from "react-router-dom"
import "./navbar.css"
export const NavBar = () => {
const redirect = useHistory()
const logOut= () => {
    window.localStorage.removeItem("alkemyToken");
    redirect.push("/login")
}
    return (
        <header className="headerStyle text-end">
                    <p className="text-black text-center">Super Hero App</p>
            {window.localStorage.getItem("alkemyToken")?<button className="btn btn-secondary btnNav rounded-0" onClick={() => logOut()}>Log Out</button>: null}
        </header>
    )
}
