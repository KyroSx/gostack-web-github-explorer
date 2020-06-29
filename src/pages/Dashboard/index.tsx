/* eslint-disable camelcase */
import React, { useState, FormEvent, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import {
  Title,
  Form,
  SearchButton,
  SearchInput,
  Repositories,
  Error,
} from "./styles";
import api from "../../services/api";
import logo from "../../assets/logo.svg";

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const localStorageKey = "@GithubExplorer:repositories";

  const [newRepository, setNewRepository] = useState("");
  const [inputError, setInputError] = useState("");
  const [repositories, setRepositories] = useState<Array<Repository>>(() => {
    const storagedRepositories = localStorage.getItem(localStorageKey);

    if (storagedRepositories) return JSON.parse(storagedRepositories);

    return [];
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(repositories));
  }, [repositories]);

  async function handleAddNewRepository(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newRepository) {
      setInputError("É necessário informar autor/repositorio");
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepository}`);
      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepository("");
      setInputError("");
    } catch (err) {
      setInputError("Erro ao buscar autor/repositorio");
    }
  }

  return (
    <>
      <img src={logo} alt="Github logo" />
      <Title>Explore repositórios no GitHub</Title>

      <Form onSubmit={handleAddNewRepository}>
        <SearchInput
          hasError={Boolean(inputError)}
          placeholder="Digite autor/repositorio"
          value={newRepository}
          onChange={(e) => setNewRepository(e.target.value)}
        />
        <SearchButton type="submit">Pesquisar</SearchButton>
      </Form>
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
