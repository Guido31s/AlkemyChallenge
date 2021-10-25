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
      <Card>
        <Link to={`/detail/${data.id}`}>
          <Card.Img variant="top" src={data.image.url} alt="Not image available"/>
        </Link>
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>

          <Link to={`/detail/${data.id}`}>
            <button variant="primary">Details</button>
          </Link>
  
          {team?.length > 0 && teamIds.includes(data.id) ? (
            <button
              variant="primary"
              onClick={() => dispatch(removeHero(data.id))}
            >
              Remove
            </button>
          ) : ((data.biography.alignment === "bad") & (badHeros < 3)) |
            ((data.biography.alignment === "good") & (goodHeros < 3)) ? (
            <button variant="primary" onClick={() => dispatch(addHero(data))}>
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