import React from "react";
import { FiChevronRight } from "react-icons/fi";

import { Title, Form, SearchButton, SearchInput, Repositories } from "./styles";
import logo from "../../assets/logo.svg";

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="Github logo" />
      <Title>Explore repositórios no GitHub</Title>

      <Form>
        <SearchInput placeholder="Digite aqui" />
        <SearchButton>Pesquisar</SearchButton>
      </Form>

      <Repositories>
        <a href="test">
          <img
            src="https://avatars3.githubusercontent.com/u/33635656?s=460&u=6146d983b3677cca68dfc59c01f9b37acd9012b6&v=4"
            alt=""
          />
          <div>
            <strong>Titulo</strong>
            <p>Descrição</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="test">
          <img
            src="https://avatars3.githubusercontent.com/u/33635656?s=460&u=6146d983b3677cca68dfc59c01f9b37acd9012b6&v=4"
            alt=""
          />
          <div>
            <strong>Titulo</strong>
            <p>Descrição</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
