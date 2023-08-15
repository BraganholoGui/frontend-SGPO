import styled from 'styled-components';
import { theme } from '../../../theme';

export const ButtonSave = styled.button`
 display: flex;
 text-align: center;
 justify-content: center;
 align-items: center;
  width:170px;
 height: 45px;
 background-color: ${theme.save};
 color: #fff;
 font-weight: 700;
 font-size:20px;
 margin: 0 2%;
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
 margin: 0 2%;
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
