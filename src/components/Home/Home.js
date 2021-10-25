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
    <div >
      <TeamPreview />
      <div >
        {actualSearch.length ? (
          <div
            onClick={() => deleteSearch()}
            style={{ cursor: "pointer" }}
            
          >
            <h3 > Delete search: </h3>
            <h3 > {actualSearch}</h3>
            <h3 > x</h3>
          </div>
        ) : (
          <form  onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              placeholder="search hero by name"
              value={search}
              onChange={(e)=>onSearchChange(e)}
            />
            <button type="submit">Search</button>
          </form>
        )}
        <div>
          <div  onClick={() => setOpen(!isOpen)}>
            <div>Amount: {amount}</div>
            <div >
              <div  />
              <div
                
              />
            </div>
          </div>
          <div
            
          >
            <p onClick={() => {setAmount(15); setOpen(false)}}>15</p>
            <p onClick={() => {setAmount(24); setOpen(false)}}>24</p>
            <p onClick={() => {setAmount(48); setOpen(false)}}>48</p>
          </div>
        </div>
      </div>
      <div >
        {heros.length > 0 ? (
          heros.map((hero, index) => <HeroCard data={hero} key={index} />)
        ) : (
          <Spinner animation="border" variant="light"/>
        )}
      </div>
    </div>
  );
};

export default Home;
