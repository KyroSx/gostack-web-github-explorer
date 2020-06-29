import styled from "styled-components";
import { shade } from "polished";

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;

  max-width: 450px;
  line-height: 56px;
  margin-top: 80px;
`;

export const Form = styled.form`
  margin-top: 40px;
  max-width: 700px;
  display: flex;
`;

export const SearchInput = styled.input`
  flex: 1;
  height: 70px;
  padding: 0 24px;

  border: 0;
  border-radius: 5px 0 0 5px;

  color: #3a3a3a;
  &::placeholder {
    color: #a8a8b3;
  }
`;

export const SearchButton = styled.button`
  color: #fff;
  font-weight: bold;
  background-color: #48cc56;

  height: 70px;
  width: 210px;

  padding: 0 24px;

  border: 0;
  border-radius: 0 5px 5px 0;

  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, "#48cc56")};
  }
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    display: flex;
    align-items: center;

    background: #fff;
    text-decoration: none;

    padding: 24px;
    width: 100%;

    border-radius: 5px;

    transition: transform 0.2s;

    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 16px;
    }

    img {
      width: 64px;
      height: 64px;

      border-radius: 50%;
    }

    div {
      margin-left: 16px;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;

      &:hover {
        color: ${shade(0.2, "#cbcbd6")};
      }
    }
  }
`;
