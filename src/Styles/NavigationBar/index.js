import styled from "styled-components";

const NavigationBar = styled.nav`
  display: flex;
  height: 6vh;
  background-color: #19181a;
  color: #b19f9e;
  align-items: center;
  a,
  a:active,
  a:visited {
    color: inherit;
    text-decoration: none;
    padding: 0.25rem;
    border-right: 1px solid #b19f9e;
  }
  a:last-child {
    border-right: none;
  }
  button {
    background: none;
    color: inherit;
    border: none;
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;
    padding: 0.25rem;
  }
`;

export default NavigationBar;
