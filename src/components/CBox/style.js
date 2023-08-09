import styled from 'styled-components';
import { theme } from '../../theme';

export const ContainerBox = styled.div`
  margin-top: 2%;
  width: 80%;
  border-radius: 20px;
  border-top: 2px solid rgb(	17, 91, 76, 0.3);
  border-left: 2px solid rgb(	17, 91, 76, 0.3);
  border-right: 2px solid rgb(	17, 91, 76, 0.5);
  border-bottom: 2px solid rgb(	17, 91, 76, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${theme.bgDark};
  `;

export const Box = styled.div`
    width: 100%;
    display: grid;
    ${({ quantityC }) => quantityC ? `grid-template-columns: repeat(${quantityC}, 1fr)` : 'grid-template-columns:1fr'}
    /* grid-template-columns: repeat(3, 1fr); */
    `;

export const TitleBox = styled.div`
    width: 100%;
    color: #fff;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5% 0;
    `;