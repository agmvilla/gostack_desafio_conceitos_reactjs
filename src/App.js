import React, { useState, useEffect } from "react";
import api from "./services/api"
import Header from "./components/Header";

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([])

  useEffect(() =>{
    api.get('repositories').then( response => {
      setRepos(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Andres",
      url: "https://github.com.br/umarket/react",
      techs: ['NodeJS', 'reacJS', 'react-native']
    })

    setRepos([...repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepos(repos.filter(
      repo => repo.id != id
    ));
  }

  return (
    <div>
      <Header title="Listagem de Repositórios">
      </Header>
      <ul data-testid="repository-list">
        {repos.map(repo => 
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
