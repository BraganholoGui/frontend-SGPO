import styled from 'styled-components';

export const Box = styled.div`
  margin-top: 2%;
  width: 80%;
  border-radius: 20px;
  border-top: 2px solid rgb(	17, 91, 76, 0.3);
  border-left: 2px solid rgb(	17, 91, 76, 0.3);
  border-right: 2px solid rgb(	17, 91, 76, 0.5);
  border-bottom: 2px solid rgb(	17, 91, 76, 0.5);
  padding: 25px;
  display: grid;
   ${({ quantityC }) => quantityC ? `grid-template-columns: repeat(${quantityC}, 1fr)` : 'grid-template-columns:1fr'}
  /* grid-template-columns: repeat(3, 1fr); */
  `;
