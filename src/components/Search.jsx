import axios from "axios";
import React, { useRef, useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query) {
      return;
    }
    setError("");
    setLoading(true);
    try {
      const URL = 'http://localhost:4000/search'
      const res = await axios.get(URL, {
        params:{
          query: query,
        }
      })
      const data = res.data.organic_results || [];
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao fazer a busca. :(");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="Logo">
        <h1>Bubble</h1>
        <img src="logo.png" alt="logo" />
      </div>
      <div className="Input">
        <form className="Search__Form" onSubmit={handleSubmit}>
          <input
            className="App-Input"
            type="text"
            placeholder="Pesquisar"
            onChange={(e) => setQuery(e.target.value)}
          />
          <img
            src="SearchIcon.svg"
            alt="search"
            className="Search__Icon"
            onClick={handleSubmit}
          />
        </form>
      </div>
      <div>
        {error ? (
          <h4>{error}</h4>
        ) : loading ? (
          <h4>Carregando...</h4>
        ) : (
          <ul>
            {results.map((r, index) => {
              return (
                <li className="ul__link" key={index}>
                  <a className="a__link" href={r.link} target="_blank" rel="noopener noreferrer">
                    {r.title}
                  </a>
                  <p>{r.snippet}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
