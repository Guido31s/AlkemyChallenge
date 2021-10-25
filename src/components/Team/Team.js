import React from "react"
import { useSelector } from "react-redux"
import TeamCard from "../TeamCard/TeamCard";

export const Team = () => {
let heros = useSelector((state) => state.team)

return heros?.length ? (
    <div>
        {heros.map((hero) => <TeamCard data={hero} />)}
    </div>
): <div>No Team</div>
}
