import axios from "axios";
import { useState } from "react";



function PokemonTheme(){
    const [pokemon, setPokemon] = useState([]);
    const fetchRandomPokemon= async () =>{
        try{
            const randomId= Math.floor(Math.random()*1025)+1;
            const response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`)

            setPokemon({
                name: response.data.name,
                image: response.data.sprites.front_default,
                types: response.data.types.map(t => t.type.name)
            })
            
        }catch(err){
            console.error("Error getting random Pokemon", error);
        }
        
    };
    return(
        <div>
        <button onClick={fetchRandomPokemon}>Generate Team</button>
        
    
    
        {pokemon && (
         <div>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
         </div>
        )}
    </div>
    );
}
    

export default PokemonTheme;