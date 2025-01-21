import { useEffect, useState } from "react";
import "./index.css";
import LoadingSpinner from "./components/LoadingSpinner";
import PokemonCards from "./components/PokemonCards";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import GoogleAd from "./components/GoogleAd";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const API = "https://pokeapi.co/api/v2/pokemon";

  const fetchPokemon = async (page) => {
    setLoad(true);
    let success = false;

    for (let i = page; i <= 27; i++) {
      try {
        const offset = (i - 1) * 24;
        const res = await fetch(`${API}?limit=24&offset=${offset}`);
        if (!res.ok) {
          console.log(`Failed to fetch data for page ${i}: ${res.statusText}`);
          continue;
        }
        const data = await res.json();

        const detailedPokemonData = data.results.map(async (curPokemon) => {
          const res = await fetch(curPokemon.url);
          if (!res.ok) {
            throw new Error(
              `Failed to fetch details for ${curPokemon.name}: ${res.statusText}`
            );
          }
          const data = await res.json();
          return data;
        });

        const detailedResponses = await Promise.all(detailedPokemonData);
        setPokemon(detailedResponses);
        setTotalPages(27);
        success = true;
        break;
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    if (!success) {
      setError(true);
    }
    setLoad(false);
  };

  useEffect(() => {
    fetchPokemon(currentPage);
  }, [currentPage]);

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (load && !pokemon.length) {
    return <LoadingSpinner />;
  }
  if (error) {
    return (
      <h1 className="error">Failed to load Pokémon. Please try again later.</h1>
    );
  }
  return (
    <>
      <section className="container">
        <Header search={search} setSearch={setSearch} />

        <div>
          <ul className="cards">
            {searchData.map((curPokemon) => (
              <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
            ))}
          </ul>
          {load && <LoadingSpinner />}
        </div>
        <GoogleAd/>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </>
  );
};

export default Pokemon;
