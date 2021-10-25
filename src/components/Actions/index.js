import {
    ADD_HERO,
    FIND_HERO,
    REMOVE_HERO,
    GET_HERO,
    CLEAR_HERO,
  } from "./heroNames";
  import axios from "axios";
  
  export function findHero(search) {
    return async (dispatch) => {
      let findHeros = [];
      await axios
        .get(
          `https://www.superheroapi.com/api.php/4606554106032715/search/${search}`
        )
        .then((response) => {
          response.data.results.map(async (hero) => {
            await axios
              .get(
                `https://www.superheroapi.com/api.php/4606554106032715/${hero.id}`
              )
              .then((response) => findHeros.push(response));
          });
        });
  
      dispatch({
        type: FIND_HERO,
        payload: findHeros,
      });
    };
  }
  
  export function getHero(amount) {
    let heros = [];
    return async (dispatch) => {
      for (let i = 0; i < amount; i++) {
        await axios
          .get(
            `https://www.superheroapi.com/api.php/4606554106032715/${Math.floor(
              Math.random() * 731
            )}`
          )
          .then((response) => heros.push(response));
      }
  
      dispatch({
        type: GET_HERO,
        payload: heros,
      });
    };
  }
  
  export function addHero(payload) {
    return {
      type: ADD_HERO,
      payload,
    };
  }
  
  export function removeHero(payload) {
    return {
      type: REMOVE_HERO,
      payload,
    };
  }
  
  export function clearHero() {
    return {
      type: CLEAR_HERO,
    };
  }
  
  