import styled from 'styled-components';
import { theme } from '../../../theme';

export const ButtonDelete = styled.button`
 display: flex;
 text-align: center;
 justify-content: center;
 align-items: center;
  width:170px;
 height: 45px;
 background-color: ${theme.warning};
 color: #fff;
 font-weight: 700;
 font-size:20px;
 margin-left:2%;
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
export const ButtonSaveLock = styled.button`
 display: flex;
 text-align: center;
 justify-content: center;
 align-items: center;
 width:170px;
 height: 45px;
 background-color: ${theme.buttonLock};
 color: #fff;
 font-weight: 700;
 font-size:20px;
 margin-left:2%;
 a{
   color:#fff; 
   text-transform: uppercase;
   text-decoration: none;
   &:hover{
    font-style: italic;
   }
 }
 border-radius: 10px;
`; 
