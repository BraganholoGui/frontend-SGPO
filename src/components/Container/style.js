import styled from 'styled-components';

export const Content = styled.div`
/* background-color:#000 ; */
  border-radius: 20px;
  border-top: 2px solid rgb(	17, 91, 76, 0.3);
  border-left: 2px solid rgb(	17, 91, 76, 0.3);
  border-right: 2px solid rgb(	17, 91, 76, 0.5);
  border-bottom: 2px solid rgb(	17, 91, 76, 0.5);
  padding: 15px;
  /* grid-column: 1/3;
  grid-row: 1; */
  display: flex;
  color: #fff;
  /* justify-content:center ; */
  align-items: center;
  flex-direction: column;
  margin: 10px;
  /* height: 420px; */
  ${({ heightLimit }) => heightLimit ? `` : 'height: 350px'}
  ${({ heightLimit }) => heightLimit ? `` : 'max-height: 350px'}
`; 
