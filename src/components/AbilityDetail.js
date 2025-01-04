import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AbilityDetail({ abilities }) {
  const [ability, setAbility] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const currentIndex = abilities.findIndex((a) => a.url.endsWith(`/${id}/`));
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === abilities.length - 1;

  useEffect(() => {
    async function fetchAbilityDetail() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/ability/${id}`);
        const data = await response.json();
        setAbility(data);

        const detailsPromises = data.pokemon.map(async (p) => {
          const pokemonResponse = await fetch(p.pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return {
            ...p,
            details: pokemonData,
          };
        });

        const details = await Promise.all(detailsPromises);
        setPokemonDetails(details);
      } catch (error) {
        console.error("Error fetching ability:", error);
      }
    }

    fetchAbilityDetail();
  }, [id]);

  const handleNext = () => {
    if (!isLast) {
      const nextAbilityId = abilities[currentIndex + 1].url.split('/').filter(Boolean).pop();
      navigate(`/ability/${nextAbilityId}`);
    }
  };

  const handlePrevious = () => {
    if (!isFirst) {
      const prevAbilityId = abilities[currentIndex - 1].url.split('/').filter(Boolean).pop();
      navigate(`/ability/${prevAbilityId}`);
    }
  };

  const handleBackToList = () => {
    navigate('/');
  };

  if (!ability) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ textTransform: 'capitalize' }}>
        {ability.name.replace('-', ' ')}
      </h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Effect:</h2>
        {ability.effect_entries
          .filter((entry) => entry.language.name === "en")
          .map((entry, index) => (
            <p key={index}>{entry.effect}</p>
          ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Pokémon with this ability:</h2>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '10px',
          }}
        >
          {pokemonDetails.map((p, index) => (
            <li
              key={index}
              style={{
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
              }}
            >
              <img
                src={p.details.sprites.back_default}
                alt={p.pokemon.name}
                style={{ width: '50px', height: '50px' }}
              />
              <div>
                <div style={{ textTransform: 'capitalize' }}>
                  {p.pokemon.name.replace('-', ' ')}
                </div>
                {p.is_hidden && (
                  <small style={{ color: '#666' }}>Hidden Ability</small>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        {/* دکمه بازگشت به لیست در سمت چپ */}
        <button
          onClick={handleBackToList}
          style={{
            padding: '10px 20px',
            backgroundColor: '#FF5722',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Back to List
        </button>

        {/* دکمه‌های رفت و برگشت در سمت راست */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {!isFirst && (
            <button
              onClick={handlePrevious}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Previous
            </button>
          )}
          {!isLast && (
            <button
              onClick={handleNext}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AbilityDetail;
