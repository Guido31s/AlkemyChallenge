import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { Spinner } from "react-bootstrap"
import { addHero, removeHero } from "../Actions"
import { useDispatch, useSelector } from "react-redux"
import "./detail.css"
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
    <div className="detailSection">
            <Link to="/">
                <button className="btn btn-secondary rounded-0">Return Home</button>
            </Link>
            <div className="container justify-content-between">
                <div className="text-white text-center row m-auto">
                    <div className=" col-12 col-md-6 col-xl-4">
                        <img src={detail.data.image.url} className="img-fluid card-img-top  border" style={{width: "35rem"}} alt="detail.data.name" />
                        {team?.length > 0 && teamId.includes(detail.data.id) ? (
                        <button className="btn container btn-danger rounded-0" onClick={() => dispatch(removeHero(detail.data.id))}> Remove from team</button>
                    ) : ((detail.data.biography.alignment === "bad") && (badHero < 3)) || ((detail.data.biography.alignment === "good") && (goodHero < 3)) ? (
                        <button className="btn container btn-success rounded-0" onClick={() => dispatch(addHero(detail.data))}>Add to team</button>
                    ) : (
                        <p>You have enough {detail.data.biography.alignment} heroes</p>
                    )}
                    </div>
                    <div className=" m-auto col-12 col-md-6 col-xl-4">
                        <p className="codeLetter">{detail.data.name}</p>
                        <p> Weight: {detail.data.appearance.weight[1]}</p>
                        <p> Height: {detail.data.appearance.height[1]}</p>
                        <p> Alias: {detail.data.biography.aliases[0]}</p>
                        <p> Eye color: {detail.data.appearance["eye-color"]}</p>
                        <p> Hair color: {detail.data.appearance["hair-color"]}</p>
                        <p> Work base: {detail.data.work.base}</p>
                        <p className="codeLetter">Power Stats</p>
                        <p>Intelligence: {detail.data.powerstats.intelligence}</p>
                        <p>Strength: {detail.data.powerstats.strength}</p>
                        <p>Speed: {detail.data.powerstats.speed}</p>
                        <p>Durability: {detail.data.powerstats.durability}</p>
                        <p>Combat: {detail.data.powerstats.combat}</p>
                        <p>Power: {detail.data.powerstats.power}</p>
                        <p>Alignment: {detail.data.powerstats.alignment}</p>
                    </div>
                </div>
            </div>
    </div>
    ) : <div>
        <Spinner className="text-center" animation="border" variant="light" />
    </div>
}