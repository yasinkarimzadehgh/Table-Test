import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AbilityList from './components/AbilityList';
import AbilityDetail from './components/AbilityDetail';
import { getPokemon } from './services/apiPokemon';

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemon();
        setPokemon(data.results.slice(0, 20)); // Limit to 20 abilities
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AbilityList />} />
        <Route
          path="/ability/:id"
          element={<AbilityDetail abilities={pokemon} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
