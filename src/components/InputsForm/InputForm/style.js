import styled from 'styled-components';
import { theme } from '../../../theme';

export const InputSmall = styled.input`
/* width: 30%; */
background-color: #f2f2f2;
border-radius: 10px;
border: 2px solid #ccc;
box-shadow: 2px 2px 3px #ccc;
height: 40px;
font-family: Arial, sans-serif;
font-size: 16px;
color: #333;
transition: all 0.9s ease-in-out;

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
