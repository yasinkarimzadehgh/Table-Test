import React, { useEffect, useState } from 'react'
import { getPokemon } from "../services/apiPokemon";
import { Link } from 'react-router-dom';


function AbilityList() {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
      const fetchPokemon = async () => {
        try {
          const data = await getPokemon();
          setPokemon(data.results);
        } catch (error) {
          console.error("Error fetching Pokemon:", error);
        }
      };
  
      fetchPokemon();
    }, []);
  
    function getIdFromUrl(url) {
      return url.split('/').filter(Boolean).pop();
    }
  return (
    <div className="App">
      <h1>Pokemon Abilities</h1>
      <table style={{ margin: 'auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid black' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid black' }}>Ability Name</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.map((ability) => (
            <tr key={ability.url}>
              <td style={{ padding: '10px', border: '1px solid black' }}>
                {getIdFromUrl(ability.url)}
              </td>
              <td style={{ padding: '10px', border: '1px solid black' }}>
                <Link to={`/ability/${getIdFromUrl(ability.url)}`}>
                  {ability.name.replace('-', ' ').charAt(0).toUpperCase() + ability.name.slice(1)}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AbilityList