import React from "react"
import { useSelector } from "react-redux"
import TeamCard from "../TeamCard/TeamCard"
const TeamPreview = () => {
    let team = useSelector((state) => state.team);
  
    const totalStat = (stat) =>
      team
        .map((hero) =>
          hero.powerstats[stat] === "null" ? 0 : +hero.powerstats[stat]
        )
        .reduce((a, b) => a + b);
  
    let averageWeight =
      team?.length > 0
        ? team
            .map((hero) => +hero.appearance.weight[1].split(" ")[0])
            .reduce((a, b) => a + b, 0) / team.length
        : 0;
    let averageHeight =
      team?.length > 0
        ? team
            .map((hero) => +hero.appearance.height[1].split(" ")[0])
            .reduce((a, b) => a + b, 0) / team.length
        : 0;
    let badHeros = team.filter(
      (hero) => hero.biography.alignment === "bad"
    ).length;
    let goodHeros = team.filter(
      (hero) => hero.biography.alignment === "good"
    ).length;
  
    let teamStats =
      team.length > 0
        ? [
            { Intelligence: totalStat("intelligence") },
            { Strength: totalStat("strength") },
            { Speed: totalStat("speed") },
            { Durability: totalStat("durability") },
            { Power: totalStat("power") },
            { Combat: totalStat("combat") },
          ]
        : null;
  
    return (
      <>
         {team.length ? (
            <div className="m-auto mb-5 text-white">
              <div className="container justify-content-center">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h1><code>Team</code></h1>
                      <h5>Bad heroes: <p className="text-danger">{badHeros}</p></h5>
                      <h5>Good heroes: <p className="text-info">{goodHeros}</p></h5>
                      <h5>Avg weight: <p className="text-success">{Math.ceil(averageWeight)} kg</p></h5>
                      <h5>Avg height: <p className="text-success"> {Math.ceil(averageHeight)} cm</p></h5>
                    </div>
                        <div className="col-12 col-md-6">
                               <h1><code>Powerstats</code></h1>
                                {
                                  teamStats.sort((a, b) => Object.values(b) - Object.values(a))
                                    .map((stat) => (
                                          <p className="text-warning">{Object.keys(stat)}: {Object.values(stat)} </p>
                                          ))}
                        </div>
                  </div>
              </div>
              <div className="container">
                <div className="row">
                  {team.map((hero) => (
                    <TeamCard data={hero} />
                  ))}
                </div>
              </div>
            </div>
        ) : (
          <div>
            <h5 className="text-white mb-5 mt-5">Your team is empty</h5>
          </div>
        )}
      </>
    );
  };
  
  export default TeamPreview;
  