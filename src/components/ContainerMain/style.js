import styled from 'styled-components';

export const ContainerMain = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  flex-direction: column;
  `;
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
  grid-template-columns: repeat(4, 1fr);
  `;

export const ContentCreateGraph = styled.div`
  border-radius: 20px;
  border-top: 2px solid rgb(	17, 91, 76, 0.3);
  border-left: 2px solid rgb(	17, 91, 76, 0.3);
  border-right: 2px solid rgb(	17, 91, 76, 0.5);
  border-bottom: 2px solid rgb(	17, 91, 76, 0.5);
  padding: 15px;
  grid-column:1/7 ;
  grid-row: 1/7;
  margin: 10px;
`; 
