import styled from 'styled-components';
import {Visibility, VisibilityOff} from '@mui/icons-material';

export const ContainerBody = styled.div`
background-image: linear-gradient(#b6edc8, #115b4c);
/* background-image: linear-gradient(#115b4c, #b6edc8); */
display: flex;
align-items: center;
justify-content: flex-start;
height:100vh;
flex-direction: column;
`;
export const Title = styled.i`
font-size: 25px;
`;

export const ContainerAll = styled.div`
/* background-color:   rgb(255, 255, 255, 0.5); */
background: rgba(255, 255, 255, 0.1); /* Cor de fundo com transparência */
box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* Sombra suave */
backdrop-filter: blur(5px); /* Aplica um desfoque ao fundo */
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
min-width: 45%;
height: 50%;
border-radius: 20px;
border: 1px solid #000;
box-shadow: 7px 10px 7px rgb(0 0 0 / 35%);
padding: 5%;

`;
export const TitleLogin = styled.header`
font-size: 28px;
font-weight: 700;
`;
export const MainTitleLogin = styled.div`
font-size: 25px;
font-weight: 700;
display:flex ;
justify-content: center;
align-items: center;
padding: 30px 0;
flex-direction: column;
`;
export const Line = styled.hr`
width: 100%;
padding-bottom: 5px;
`;
export const ContainerForm = styled.div`
width: 100%;
height: 90%;
display: flex;
align-items: flex-start;
justify-content: center;
`;
export const Form = styled.div`
width: 90%;
height:100%;
display: flex;
align-items: start;
justify-content: center;
flex-direction: column;
`;

export const ContainerFields = styled.div`
width: 100%;
height: 70%;
display: flex;
align-items: start;
justify-content: center;
flex-direction: column;
`;

export const Label = styled.label`
font-weight: 400;
font-size: 20px;
line-height: 25px;
display: flex;
align-items: center;
color: #115b4c;
margin-top: 5%;

`;
export const InputForm = styled.input`
 /* display: block; */
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
export const ContainerButton = styled.div`
width: 100%;
height: 70%;
display: flex;
align-items: center;
justify-content: flex-start;
flex-direction: column;
margin-top: 13%;
`;

export const ButtonForm = styled.button`
min-width: 40%;
height: 35px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
color: #fff;
background: #000;
border-radius: 5px;
font-size:16px;
font-weight: 600;
cursor: pointer;
&&:hover{
    font-style: italic;
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

export const Cube = styled.div`
position: relative;
width: 90px;
height: 90px;
transform-style: preserve-3d;
font-size: 25px;
transform: rotateX(30deg);
animation: animate 4s linear infinite;
background:linear-gradient(#151515, #4DFFC5);
border-radius: 15px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
div{
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  border-radius: 15px;

  span{
    cursor: pointer;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:linear-gradient(#151515, #4DFFC5);
    transform: rotateY(calc(90deg * var(--i))) translateZ(30deg);
    border-radius: 15px;
  }
}
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


