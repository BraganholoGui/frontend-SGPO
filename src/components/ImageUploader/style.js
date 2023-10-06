import styled from 'styled-components';
import { theme } from '../../theme';

export const ContainerMain = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`; 

export const TitlePhoto = styled.label`
border-radius:20px;
border:1px solid #115b4c;
padding:10px;
margin-right:10px;
`; 
export const InputPhoto = styled.input`
display: none;
`; 
export const ImgPhoto = styled.img`
width: 150px; 
height: auto;
margin-right:10px; 
margin-bottom:10px; 
border-radius:50%;
cursor: pointer;
`; 
export const ImgPhotoBig = styled.img`
width: 500px; 
height: auto;
/* border-radius:50%; */
`; 
