import styled from "styled-components";

const Landing = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  font-family: Archivo;
  font-size: 2.5rem;
  div:nth-child(2) {
    background: #a16e83;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 75%;
    height: 60%;
    font-size: 1.75rem;
    line-height: 3rem;
    padding: 1rem;
    box-shadow: 0 0 5px 5px #a16e83;
    label {
      text-decoration: underline;
    }
    p {
      width: 48%;
    }
    aside {
      display: flex;
      flex-direction: column;
      width: 48%;
    }
  }
`;

export default Landing;
