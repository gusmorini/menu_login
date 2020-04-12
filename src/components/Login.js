import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

export default function Login() {
  /**
   * definindo as variáveis do state
   * no formato Hooks
   */

  const [open, setOpen] = useState(false);
  const [logged, setLogged] = useState(false);
  const [name, setName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [email, setEmail] = useState(null);
  const [picture, setPicture] = useState(null);

  /**
   * useEffect faz o papel de
   * componentDidMount e componentDidUpdate
   * quando inicia ele executa o getItems
   * e toda vez que o logged for modificado
   * ele executa o getItems()
   */

  useEffect(() => {
    getItems();
  }, [logged]);

  /**
   * se existir dados no localstorage
   * busca e escreve no state
   */

  function getItems() {
    if (!!localStorage.getItem("@bemdboa")) {
      const { name, email, picture, first } = JSON.parse(
        localStorage.getItem("@bemdboa")
      );
      setLogged(true);
      setName(name);
      setEmail(email);
      setPicture(picture);
      setFirstName(first);
    } else if (!logged) {
      setPicture("/default-avatar.jpg");
      setFirstName("entrar");
    }
  }

  /**
   * se não está logado entra
   * separa o primeiro nome do cliente
   * salva os dados no localstorage
   * seta como logado para atualizar os dados
   */

  function setItems(items) {
    if (!logged) {
      const { name } = items;

      const first = name.split(" ", 1);

      const data = {
        ...items,
        first: first[0],
      };

      localStorage.setItem("@bemdboa", JSON.stringify(data));
      setLogged(true);
    }
  }

  /**
   * abre e fecha o box de login
   */

  function handleOpen() {
    setOpen(!open);
  }

  /**
   * fecha o bloco de login
   * ao clicar fora dele se
   * ele estiver aberto
   */

  function handleClose() {
    if (!!open) {
      setOpen(false);
    }
  }

  /**
   * trata os dados do login do facebook
   */

  function handleFacebook(res) {
    if (res.status !== "unknown" && !logged) {
      setItems({
        name: res.name,
        email: res.email,
        picture: res.picture.data.url,
      });
    }
  }

  /**
   * trata os dados do login do google
   */

  function handleGoogle(res) {
    if (!res.error && !logged) {
      setItems({
        name: res.profileObj.name,
        email: res.profileObj.email,
        picture: res.profileObj.imageUrl,
      });
    }
  }

  /**
   * faz logout da aplicação
   * e limpa o localstorage
   * talvez não seja necessário na aplicação
   * em produção
   */

  function handleLogout() {
    setLogged(false);
    localStorage.removeItem("@bemdboa");
  }

  /** define o conteúdo do box de login */
  let boxContent = (
    <>
      <FacebookLogin
        isDisabled={logged}
        appId="534709177450041"
        fields="name,email,picture"
        callback={handleFacebook}
        icon="fa-facebook"
        textButton="facebook"
        size="medium"
      />
      <GoogleLogin
        disabled={logged}
        clientId="992550120559-bojikuv1jt0lv8sbapqc697efang8s76.apps.googleusercontent.com"
        buttonText="google"
        onSuccess={handleGoogle}
        cookiePolicy="http://localhost"
      />
    </>
  );

  if (!!logged) {
    boxContent = (
      <>
        <p>{name}</p>
        <p>{email}</p>
        <strong onClick={handleLogout}>sair</strong>
      </>
    );
  }

  return (
    <Wrapper onClick={handleClose}>
      <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
        <li>item 4</li>
        <li>item 5</li>
      </ul>
      <span>
        <Container onClick={handleOpen}>
          <strong>{firstName}</strong> <Avatar src={picture} alt="avatar" />
          <Box open={open}>{boxContent}</Box>
        </Container>
      </span>
    </Wrapper>
  );
}

/**
 * estilo dos elementos
 */

const Container = styled.div`
  position: relative;
  width: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  strong {
    margin-right: 10px;
    text-transform: capitalize;
  }
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  color: #ccc;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ul {
    list-style: none;
    display: flex;
    li {
      margin-right: 5px;
      cursor: pointer;
      font-size: 18px;
      border-right: 2px solid rgba(0, 0, 0, 0.1);
      padding: 0 5px;
      display: flex;
      align-items: center;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border: 0;
      }
    }
  }
`;

const Box = styled.div`
  padding: 20px;
  background: #eee;
  width: 200px;
  left: calc(50% - 100px);
  top: calc(100% + 20px);
  position: absolute;
  border-radius: 4px;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.7);
  text-align: left;
  line-height: 30px;

  display: none;

  ${(props) =>
    props.open &&
    css`
      display: block;
    `}

  &::before {
    content: "";
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #eee;
  }

  button {
    border-radius: 4px;
    text-align: center;
    width: 100%;
    text-transform: uppercase;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
