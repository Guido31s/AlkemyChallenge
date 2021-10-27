import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearHero, findHero, getHero } from "../Actions/index";
import HeroCard from "../HeroCard/HeroCard"
import TeamPreview from "../TeamPreview/TeamPreview"


const Home = () => {
  const dispatch = useDispatch();
  let heros = useSelector((state) => state.search);
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState(12);
  const [isOpen, setOpen] = useState(false);
  const [actualSearch, setActualSearch] = useState("");

  useEffect(() => {
    dispatch(getHero(amount));
    return () => {
      setActualSearch("");
      dispatch(clearHero());
    };
  }, [amount]);

  const handleSubmit = (e) => {
    e.preventDefault();
     dispatch(findHero(search));
    setTimeout(() => {
      setActualSearch(search);
    }, 1500);
    setOpen(false);
  };


  const onSearchChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value);
  };

  const deleteSearch = () => {
    dispatch(clearHero());
    dispatch(getHero(amount));
    setActualSearch("");
    setOpen(false);
  };

  return (
    <div className="bg-dark">
      <TeamPreview />
      <div >
        {actualSearch.length ? (
          <div
            onClick={() => deleteSearch()}
            style={{ cursor: "pointer" }}
            className="text-white"
          >
            <button className="btn btn-outline-warning rounded-0 text-white bg-black"> Delete Search:  {actualSearch} </button>

          </div>
        ) : (
          <form  onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              placeholder="Search Hero"
              value={search}
              onChange={(e)=>onSearchChange(e)}
              className="btn border-dark rounded-0 bg-white"
              style={{cursor: "text"}}
            />
            <button className="btn btn-secondary rounded-0" type="submit">Search</button>
          </form>
        )}
        <div>
          <div  onClick={() => setOpen(!isOpen)}>
            <h3 className="text-white m-3"><code>Amount: {amount}</code></h3>
            <div>
            </div>
          </div>
          <div className="text-white">
            <p>Select amount of Heroes</p>
            <p onClick={() => {setAmount(15); setOpen(false)}} className="btn btn-primary rounded-0">15</p>
            <p onClick={() => {setAmount(24); setOpen(false)}} className="btn btn-success rounded-0">24</p>
            <p onClick={() => {setAmount(48); setOpen(false)}} className="btn btn-danger rounded-0">48</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
        {heros.length > 0 ? (
          heros.map((hero, index) => <HeroCard data={hero} key={index} />)
        ) : (
          <span className="text-center"><Spinner animation="border" variant="light"/></span>
        )}
        </div>
      </div>
    </div>
  );
};

export default Home;
