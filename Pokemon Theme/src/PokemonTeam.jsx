import axios from "axios";
import { useState } from "react";
import "./PokemonTheme.css";


function PokemonTheme(){
    const [team, setTeam] = useState([]);


    const fetchRandomPokemon= async () =>{
        try{
            //get random pokemon from api
            const randomId= Math.floor(Math.random()*1025)+1;
            const response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`)

            const mainPokemon={
                name: response.data.name,
                image: response.data.sprites.front_default,
                types: response.data.types.map(t => t.type.name)
            };
            //get list of pokemon with same type 
            const typeUrl = response.data.types[0].type.url;
            const typeResponse = await axios.get(typeUrl);

            //extract list 
            const pokemonOfSameType = typeResponse.data.pokemon
                //get pokemon from url
                .map(p => p.pokemon.url)
                //get rid of duplicates
                .filter(url=>!url.includes(`/${randomId}/`));
            //shuffle list to produce different/random team outcomes
            const shuffledPokemon = pokemonOfSameType
                .sort(() => 0.5 - Math.random())
                //select 5 random pokemon from shuffled list
                .slice(0,5);

            //get data of team
            const teamData = await Promise.all(
                shuffledPokemon.map(async (pokeUrl) =>{
                    const pokeData = await axios.get(pokeUrl);
                    return{
                        name: pokeData.data.name,
                        image: pokeData.data.sprites.front_default,
                        types: pokeData.data.types.map(t => t.type.name)
                    };
                })
            );
            setTeam([mainPokemon, ...teamData])

        //handle errors
        }catch(err){
            console.error("Error getting random Pokemon", err);
        }
        
    };
    return(
        <div className="container">
            <button onClick={fetchRandomPokemon}>Generate Team</button>
        
            {team.length > 0 &&(
                <div>
                    <h2>Pokemon Team</h2>
                    {team.map((p,index) => (
                        <div key={index}>
                            <h3>{p.name}</h3>
                            <img src={p.image}/>
                            <p>types: {p.types.join(", ")}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
          
    
//         {pokemon && (
//          <div>
//             <h2>{pokemon.name}</h2>
//             <img src={pokemon.image} alt={pokemon.name} />
//          </div>
//         )}
//     </div>
//     );
// }
    

export default PokemonTheme;