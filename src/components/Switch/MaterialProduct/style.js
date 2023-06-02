import styled from 'styled-components';
import { theme } from '../../../theme';

export const ContainerFormSmall = styled.div`
width: 30%;
display: flex;
flex-direction: column;
transition: all 2s ;
transform: rotate(-360deg);
@media (max-width: 860px) {
    width: 95%;
    transition: all 2s ;
    transform: rotate(360deg);
  }

`; 
export const ContainerFormMedium = styled.div`
width: 40%;
display: flex;
transition: all 2s ;
transform: rotate(-360deg);
z-index: 1;
flex-direction: column;
@media (max-width: 860px) {
    width: 95%;
    transition: all 2s ;
    transform: rotate(360deg);

  }

`; 
export const ContainerFormBig = styled.div`
width: 90%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
transition: all 2s ;
transform: rotate(-360deg);
@media (max-width: 860px) {
    width: 95%;
    transition: all 2s ;
    transform: rotate(360deg);

  }

`; 
export const Title = styled.label`
font-family: Monospace;
font-weight: 900;
`; 

export const Label = styled.label`
width: 100%;
display: flex;
flex-direction: center;
align-items: center;
`; 
export const Span = styled.span`
display: flex;
flex-direction: center;
align-items: center;
padding: 15px;
font-family: Monospace;
font-weight: bold;
`; 
