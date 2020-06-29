/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { FiChevronsLeft, FiChevronRight } from "react-icons/fi";
import { useRouteMatch, Link } from "react-router-dom";

import logo from "../../assets/logo.svg";
import { Header, RepositoryInfo, Issues } from "./styles";
import api from "../../services/api";

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Array<Issue>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [repositoryData, issuesData] = await Promise.all([
        await api.get(`repos/${params.repository}`),
        await api.get(`repos/${params.repository}/issues`),
      ]);

      const repositoryApi = repositoryData.data;
      const issuesApi = issuesData.data;

      setRepository(repositoryApi);
      setIssues(issuesApi);
    };

    fetchData();
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logo} alt="Github explorer" />

        <Link to="/">
          <FiChevronsLeft size={20} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>issues</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
