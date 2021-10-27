import React from "react";
import { Card } from "react-bootstrap";
import { addHero, removeHero } from "../Actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeroCard = ({ data }) => {
    const dispatch = useDispatch();
    let team = useSelector((state) => state.team);
    let teamIds= team.map(hero => hero.id)
    let badHeros = team.filter(hero=> hero.biography.alignment === "bad").length
    let goodHeros = team.filter(hero=> hero.biography.alignment === "good").length
  
  
    return (
      <Card style={{ width: "20rem" }} className="m-auto rounded-0 bg-light">
        <div>
        <Link to={`/detail/${data.data.id}`} > 
        <Card.Img  src={data.data.image.url} className="w-100" alt="Not image available"/>
        </Link>
        </div>
       
        <Card.Body>
          <Card.Title>{data.data.name}</Card.Title>
          <Card.Text>
            <div>
              <p>Power: {data.data.powerstats.power}</p>
              <p>Strength: {data.data.powerstats.strength}</p>
              <p>Speed: {data.data.powerstats.speed}</p>
              <p>Combat: {data.data.powerstats.combat}</p>
              <p>Intelligence: {data.data.powerstats.intelligence}</p>
              <p>Durability: {data.data.powerstats.durability}</p>
              <p>Aligment: {data.data.biography.alignment}</p>
            </div>
          </Card.Text>
          <Link to={`/detail/${data.data.id}`}>
          <button
          className="btn btn-info text-white rounded-0 m-1">
            View Details
          </button>
          </Link>
  
          {team?.length>0 && teamIds.includes(data.data.id) ? (
            <button
            className="btn btn-danger rounded-0"
              variant="primary"
              onClick={() => dispatch(removeHero(data.data.id))}
            >
              Remove from team
            </button>
          ) : (data.data.biography.alignment === "bad" && badHeros < 3) || (data.data.biography.alignment === "good" && goodHeros < 3) ?(
            <button
            className="btn btn-success rounded-0"
            
              onClick={() => dispatch(addHero(data.data))}
            >
              Add to team
            </button>
          ): <p>You have enought {data.data.biography.alignment} heroes.</p>}
        </Card.Body>
      </Card>
    );
  };
  
  export default HeroCard;
  
  