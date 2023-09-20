import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../theme';
const COLORS ={
  primaryDark: '#115b4c',
  primaryLight: '#b6edc8',
};

export const MenuLabel = styled.label`
  position: fixed;
  top: 1.7rem;
  left: 0.2rem;
  border-radius: 0% 0% 50% 0%;
  height:4rem;
  width: 4rem;
  cursor: pointer;
  z-index: 99999;
  text-align: center; 
  display: flex;
  justify-content: center;
  flex-direction: center;
`;

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
  background-color: rgba(255, 0, 0, 0.6);
 }
`; 
export const ButtonCancel= styled.button`
 display: flex;
 text-align: center;
 justify-content: center;
 align-items: center;
  width:170px;
 height: 45px;
 background-color: ${theme.input};
 color: #000;
 font-weight: 700;
 font-size:20px;
 margin: 0 2%;
 a{
   color:#000; 
   text-transform: uppercase;
   text-decoration: none;
   &:hover{
    font-style: italic;
   }
 }
 border-radius: 10px;

 &:hover{
  background-color: rgba(24, 31, 28, 0.4);
 }
`; 