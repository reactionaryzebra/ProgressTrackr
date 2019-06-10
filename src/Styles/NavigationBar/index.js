import styled from "styled-components";

const NavigationBar = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 6vh;
  background-color: #19181a;
  color: #b19f9e;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  a,
  a:active,
  a:visited {
    color: inherit;
    text-decoration: none;
    padding: 0.5rem;
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
