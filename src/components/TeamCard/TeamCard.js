import React from "react";
import { Card } from "react-bootstrap";
import { addHero, removeHero } from "../Actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


const TeamCard = ({ data }) => {
    const dispatch = useDispatch();
    let team = useSelector((state) => state.team);
    
  
    let teamIds = team.map((hero) => hero.id);
    let badHeros = team.filter(
      (hero) => hero.biography.alignment === "bad"
    ).length;
    let goodHeros = team.filter(
      (hero) => hero.biography.alignment === "good"
    ).length;
  
    return (
      <Card style={{ width: "20rem" }} className="m-auto mt-5 shadow-lg rounded-0 bg-light text-black">
        <Link to={`/detail/${data.id}`}>
          <Card.Img variant="top" src={data.image.url} alt="Not image available"/>
        </Link>
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Text>
            <div>
              <p>Power: {data.powerstats.power}</p>
              <p>Strength: {data.powerstats.strength}</p>
              <p>Speed: {data.powerstats.speed}</p>
              <p>Combat: {data.powerstats.combat}</p>
              <p>Intelligence: {data.powerstats.intelligence}</p>
              <p>Durability: {data.powerstats.durability}</p>
              <p>Aligment: {data.biography.alignment}</p>
            </div>
          </Card.Text>
          <Link to={`/detail/${data.id}`}>
            <button className="btn btn-info text-white rounded-0 m-3">Details</button>
          </Link>
  
          {team?.length > 0 && teamIds.includes(data.id) ? (
            <button
            className="btn btn-danger rounded-0"
              onClick={() => dispatch(removeHero(data.id))}
            >
              Remove
            </button>
          ) : ((data.biography.alignment === "bad") && (badHeros < 3)) |
            ((data.biography.alignment === "good") && (goodHeros < 3)) ? (
            <button className="btn btn-outline-secondary m-auto" onClick={() => dispatch(addHero(data))}>
              Add to team
            </button>
          ) : (
            <div>you have enought {data.biography.alignment} heroes</div>
          )}
        </Card.Body>
      </Card>
    );
  };
  
  export default TeamCard;
