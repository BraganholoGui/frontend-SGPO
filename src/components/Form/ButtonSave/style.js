import styled from 'styled-components';
import { theme } from '../../../theme';

export const ButtonSave = styled.button`
 display: flex;
 text-align: center;
 justify-content: center;
 align-items: center;
 width:220px;
 height: 55px;
 background-color: ${theme.greenL};
 color: #fff;
 font-weight: 700;
 font-size:20px;
 a{
   color:#fff; 
   text-transform: uppercase;
   text-decoration: none;
   &:hover{
    font-style: italic;
   }
 }
 border-radius: 10px;

 &:hover{
  background-color: rgba(24, 31, 28, 0.8);
 }
`; 
