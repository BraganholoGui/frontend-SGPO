import styled from 'styled-components';
import { theme } from '../../theme';

export const ContainerMain = styled.div`
  width: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e0e0;
  height:5rem;
`; 

export const Title = styled.div`
 width: ${(props) => (!props.id? " 62%":"70%")};
 color: #000;
 font-size: 3vh;
 display: flex;
 text-align: center;
`; 
export const Icon = styled.div`
  color: #000;
  display: flex;
  justify-content: end;
  align-items: center;
`; 
export const TitleText = styled.div`
  color: #000;
  font-size: 4vh;
  display: flex;
 text-align: center;
 font-style: italic;
`; 

export const ButtonBox = styled.div`
 display: flex;
 text-align: center;
`; 

export const Button = styled.button`
 display: flex;
 text-align: center;
 justify-content: center;
 align-items: center;
 width:150px;
 height: 40px;
 background-color: ${theme.military};
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
  background-color: rgba(24, 31, 28, 0.9);
 }
`; 
