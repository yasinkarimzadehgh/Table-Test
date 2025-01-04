const API_URL = "https://pokeapi.co/api/v2/ability/";

export async function getPokemon() {
  const res = await fetch(`${API_URL}`);
  
  if (!res.ok) throw Error("Failed getting Data");
  
  const data = await res.json();
  return data;
}


export async function getAbilityDetails(id) {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw Error("Failed getting ability details");
    const data = await res.json();
    return data;
  }