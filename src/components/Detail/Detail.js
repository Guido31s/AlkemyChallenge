import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Spinner } from "react-bootstrap"
import { addHero, removeHero } from "../Actions"
import { useDispatch, useSelector } from "react-redux"

export function Detail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [detail, setDetail] = useState("");

    const detailHero = (id) => {
        axios.get(`https://www.superheroapi.com/api/4606554106032715/${id}`).then((res) => setDetail(res))
    }

    let team = useSelector((state) => state.team)

    let teamId = team.map((hero) => hero.id);
    let badHero = team.filter(
      (hero) => hero.biography.alignment === "bad"
    ).length;
    let goodHero = team.filter(
      (hero) => hero.biography.alignment === "good"
    ).length;

    useEffect(() => {
        detailHero(id)
        return () => {
            setDetail("")
        }
    }, [])

    return detail?.data?.name ? (
        <div className="text-white container">
          
            <div className="row">
                <h1>{detail.data.name}</h1>
                <div>
                <p> Weight: {detail.data.appearance.weight[1]}</p>
            <p> Height: {detail.data.appearance.height[1]}</p>
            <p> Alias: {detail.data.biography.aliases[0]}</p>
            <p> Eye color: {detail.data.appearance["eye-color"]}</p>
            <p> Hair color: {detail.data.appearance["hair-color"]}</p>
            <p> Work base: {detail.data.work.base}</p>
                </div>
                <h1>Power Stats</h1>
                <div>
                <div>
                <img src={detail.data.image.url} alt="" />
            </div>
                    <>
                    <div>
                        <p>Intelligence: {detail.data.powerstats.intelligence}</p>
                        <p>Strength: {detail.data.powerstats.strength}</p>
                        <p>Speed: {detail.data.powerstats.speed}</p>
                    </div>
                    <div>
                        <p>Durability: {detail.data.powerstats.durability}</p>
                        <p>Combat: {detail.data.powerstats.combat}</p>
                        <p>Power: {detail.data.powerstats.power}</p>
                    </div>
                    </>
                </div>
                <p>Alignment: {detail.data.powerstats.alignment}</p>
                {team?.length > 0 && teamId.includes(detail.data.id) ? (
                    <button className="btn btn-outline-danger rounded-0" onClick={() => dispatch(removeHero(detail.data.id))}> Remove from team</button>
                ) : ((detail.data.biography.alignment === "bad") && (badHero < 3)) || ((detail.data.biography.alignment === "good") && (goodHero < 3)) ? (
                    <button className="btn btn-outline-success rounded-0" onClick={() => dispatch(addHero(detail.data))}>Add to team</button>
                ) : (
                    <p>You have enough {detail.data.biography.alignment} heroes</p>
                )}
            </div>
        </div>
    ) : <div>
        <Spinner animation="border" variant="light" />
    </div>
}