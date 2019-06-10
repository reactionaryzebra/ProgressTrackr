import styled from "styled-components";

const Home = styled.div`
  width: 95vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  color: #19181a;
  div {
    display: flex;
    height: 85%;
    width: 90%;
    justify-content: space-around;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  div > button:last-child {
    width: 50%;
    height: 2rem;
    cursor: pointer;
    font-family: Archivo;
    font-size: 1.5rem;
    border-radius: 7px;
  }
`;

export default Home;
