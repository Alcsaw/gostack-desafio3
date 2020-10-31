import React, { useState } from "react";
import { useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data)
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const data = {
      url: "https://github.com/Rocketseat/umbriel",
      title: "Umbriel",
      techs: ["Node", "Express", "TypeScript"]
    }

    const response = await api.post('repositories', data);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    console.log("REPOSITORIES: ", repositories)

    const response = await api.delete(`repositories/${id}`);

    console.log("Deletando o projeto: ", id)
    console.log(response.status);

    if (response.status === 204) {
      setRepositories(repositories.filter(
        repository => repository.id !== id
      ));
    } else {
      alert("ops!");
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
