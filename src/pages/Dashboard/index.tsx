/* eslint-disable camelcase */
import React, { useState, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";

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
  const [newRepository, setNewRepository] = useState("");
  const [inputError, setInputError] = useState("");
  const [repositories, setRepositories] = useState<Array<Repository>>([]);

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
          <a key={repository.full_name} href="test">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
