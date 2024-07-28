import { useEffect, useState } from "react";
import "./index.css";
import LoadingSpinner from "./LoadingSpinner";
import PokemonCards from "./PokemonCards";
import Pagination from "./Pagination";
import Header from "./Header";

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
    try {
      const res = await fetch(`${API}?limit=24&offset=${(page - 1) * 24}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setTotalPages(27);
      setLoad(false);
    } catch (error) {
      console.log("Error: ", error);
      setLoad(false);
      setError(true);
    }
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
