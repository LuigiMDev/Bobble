import axios from 'axios';
import React, { useState } from 'react'

const Search = () => {
    const [query, setQuery] = useState("");
    const API_KEY = "8b629976f774f1a3d700699d3d74daf640d31c77a6b7fa07a5b3b1199e29e304";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = axios.get("https://serpapi.com/search.json", {
            params: {
                q: query,
                engine: "google",
                google_domain: "google.com.br",
                api_key: API_KEY,
                hl: "pt-br",
                gl: "br",
                num: 10,
            }
        })
    }


  return (
    <div className="App">
        <div className='Logo'>
            <h1>Bubble</h1>
            <img src="logo.png" alt="logo" />
        </div>
        <div className="Input">
            <form onSubmit={handleSubmit}>
                <input className='App-Input' type="text" placeholder='Pesquisar' onChange={(e) => setQuery(e.target.value)} />
            </form>
        </div>
    </div>
  )
}

export default Search