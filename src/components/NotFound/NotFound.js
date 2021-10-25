import React from "react"
import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <div>
            <h1>Invalid Link</h1>
            <Link to="/">
                <button>Return Home</button>
            </Link>
        </div>
    )
}