import axios from "axios";

export const searchHeros= async (search)=>{
    let findHeros = [];
 
    await axios
      .get(
        // `https://www.superheroapi.com/api.php/${process.env.API_KEY}/${ids}`
        `https://www.superheroapi.com/api.php/4606554106032715/search/${search}`
      )
      .then((response) => {
        response.data.results.map(async (hero) => {
          await axios
            .get(
              // `https://www.superheroapi.com/api.php/${process.env.API_KEY}/${ids}`
              `https://www.superheroapi.com/api.php/4606554106032715/${hero.id}`
            )
            .then((response) => findHeros.push(response));
        });
      });

      return findHeros
}

export async function detailHero(id){
  let heroData=[]
  await axios.get(`https://www.superheroapi.com/api.php/4606554106032715/${id}`)
  .then(response=>heroData=response)
  return heroData
}