import styled from "styled-components";

const AuthForm = styled.form`
  width: 80%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  input:focus,
  button:focus {
    outline: none;
  }
  input {
    height: 2rem;
    border: none;
    border-bottom: 1px solid #19181a;
    font-size: 2rem;
  }
  button {
    width: 50%;
    height: 2rem;
    cursor: pointer;
    font-family: Archivo;
    font-size: 1.5rem;
    border-radius: 7px;
  }
  p {
    color: #f13c20;
    text-align: center;
  }
`;

export default AuthForm;
