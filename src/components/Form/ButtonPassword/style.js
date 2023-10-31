import styled from 'styled-components';
import { theme } from '../../../theme';
import {Visibility, VisibilityOff} from '@mui/icons-material';

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
export const Title = styled.label`
font-family: Monospace;
font-weight: 900;
`; 
export const ButtonSaveLock = styled.button`
 display: flex;
 text-align: center;
 justify-content: center;
 align-items: center;
 width:220px;
 height: 55px;
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

export const ContainerForm = styled.div`
width: 90%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
transition: all 2s ;
transform: rotate(-360deg);
@media (max-width: 860px) {
    width: 95%;
    transition: all 2s ;
    transform: rotate(360deg);

  }

`; 

export const ContentBox = styled.div`
  width: 100%;
  display:flex ;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
  @media (max-width: 860px) {
    display: inline;
    flex-wrap: wrap;
  }
 
`; 

export const StyledPasswordInput = styled.div`
position: relative;
display: flex;
align-items: center;
width: 100%;
`;

export const PasswordInput = styled.input`
    outline: none; 
    width:100%;
    padding: 0.375rem 0.75rem;
    font-size: 18px;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 5px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;
export const PasswordInputBlock = styled.input`
    outline: none; 
    width:100%;
    padding: 0.375rem 0.75rem;
    font-size: 18px;
    line-height: 1.5;
    color: #495057;
    background-color: #cecccc;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 5px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export const PasswordToggle = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

export const PasswordIcon = styled.div`
  font-size: 20px;
`;

export const PasswordEyeIcon = styled(Visibility)`
  color: #777;
`;

export const PasswordEyeSlashIcon = styled(VisibilityOff)`
  color: #777;
`;



