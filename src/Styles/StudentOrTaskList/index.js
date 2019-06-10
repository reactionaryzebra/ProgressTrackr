import styled from "styled-components";

const StudentOrTaskList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid #19181a;
    padding: 0.5rem;
  }
  p {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default StudentOrTaskList;
