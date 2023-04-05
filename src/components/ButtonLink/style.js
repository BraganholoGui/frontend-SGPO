import styled from 'styled-components';
import { theme } from '../../theme';

export const Button = styled.button`
 display: flex;
 text-align: center;
 justify-content: center;
 align-items: center;
 width:150px;
 height: 40px;
 background-color: ${theme.military};
 color: #fff;
 font-weight: 700;
 a{
  color: #fff;
 font-weight: 700;
   text-transform: uppercase;
   text-decoration: none;
   &:hover{
    font-style: italic;
   }
 }
 border-radius: 10px;

 &:hover{
  background-color: rgba(24, 31, 28, 0.9);
 }
`; 
