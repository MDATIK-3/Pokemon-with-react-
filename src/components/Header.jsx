

const Header = ({ search, setSearch }) => {
  

  return (
    <>
      <header>
        <h1>Let&apos;s Catch Pokémon</h1>
      </header>
      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    
    </>
  );
};

export default Header;
