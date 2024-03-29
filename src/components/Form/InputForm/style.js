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
export const InputRadio = styled.input`
/* width: 30%; */
background-color: ${(props) => (props.readOnly ? `${theme.inputLock}`: `${theme.input}`)};
height: 25px;
font-size: 16px;
color: #333;
transition: all 0.9s ease-in-out;
padding:10px;

&&:focus{
    border: 2px solid ${theme.primaryDark};
    transition: all 0.9s ease-in-out;
}
@media (max-width: 860px) {
      width: 95%;
      /* transition: all 2s ;
      transform: rotate(360deg); */

    }
`; 

export const ContainerFormSmall = styled.div`
width: 25%;
display: flex;
flex-direction: column;
/* transition: all 2s ;
transform: rotate(-360deg); */
margin-left: ${(props) => (props.mgl ? `10px`: `0`)};
margin-right: ${(props) => (props.mgr ? `10px`: `0`)};
.input-mask{
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
}
@media (max-width: 860px) {
    width: 95%;
    margin-left:0;
    margin-right:0;
    /* transition: all 2s ;
    transform: rotate(360deg); */
  }

`; 
export const ContainerFormMedium = styled.div`
width: 40%;
display: flex;
/* transition: all 2s ;
transform: rotate(-360deg); */
z-index: 1;
flex-direction: column;
.input-mask{
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
}
@media (max-width: 860px) {
    width: 95%;
    /* transition: all 2s ;
    transform: rotate(360deg); */

  }
`; 
export const ContainerFormBig = styled.div`
width: 90%;
display: flex;
flex-direction: column;
/* transition: all 2s ;
transform: rotate(-360deg); */
.input-mask{
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
}
@media (max-width: 860px) {
    width: 95%;
    /* transition: all 2s ;
    transform: rotate(360deg); */

}

`; 
export const Title = styled.label`
font-family: Monospace;
font-weight: 900;
`; 
export const StyledTextarea = styled.textarea`
min-height: 100px;
background-color: ${(props) => (props.readOnly ? `${theme.inputLock}`: `${theme.input}`)};
border-radius: 10px;
border: 2px solid #ccc;
box-shadow: 2px 2px 3px #ccc;
font-family: Arial, sans-serif;
font-size: 16px;
color: #333;
padding:10px;
&&:focus{
    border: 2px solid ${theme.primaryDark};
}
  `;
