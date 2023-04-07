import styled from 'styled-components';
import { theme } from '../../../theme';

export const Input = styled.input`
/* width: 30%; */
background-color: ${(props) => (props.readOnly ? `${theme.inputLock}`: `${theme.input}`)};
border-radius: 10px;
border: 2px solid #ccc;
box-shadow: 2px 2px 3px #ccc;
height: 50px;
font-family: Arial, sans-serif;
font-size: 16px;
color: #333;
transition: all 0.9s ease-in-out;
padding:10px;

&&:focus{
    border: 2px solid ${theme.primaryDark};
    transition: all 0.9s ease-in-out;
}
`; 

export const ContainerFormSmall = styled.div`
width: 30%;
display: flex;
flex-direction: column;

`; 
export const ContainerFormMedium = styled.div`
width: 60%;
display: flex;
flex-direction: column;

`; 
export const ContainerFormBig = styled.div`
width: 90%;
display: flex;
flex-direction: column;

`; 
export const Title = styled.label`
font-family: Monospace;
font-weight: 900;
`; 
