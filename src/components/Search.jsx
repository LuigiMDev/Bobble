import axios from "axios";
import React, { useRef, useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY =
    "8b629976f774f1a3d700699d3d74daf640d31c77a6b7fa07a5b3b1199e29e304";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const res = axios.get("https://serpapi.com/search.json", {
        params: {
          q: query,
          engine: "google",
          google_domain: "google.com.br",
          api_key: API_KEY,
          hl: "pt-br",
          gl: "br",
          num: 10,
        },
      });
      const data = await res.json();
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
        <ul>
          {error ? (
            <h4>{error}</h4>
          ) : loading ? (
            <h4>Carregando...</h4>
          ) : (
            results.map((r, index) => {
              return (
                <li key={index}>
                  <a href={r.link} target="_blank" rel="noopener noreferrer">
                    {r.title}
                  </a>
                  <p>{r.snippet}</p>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Search;
