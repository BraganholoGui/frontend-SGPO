import styled from 'styled-components';
import {theme} from '../../theme'

export const ContainerMain = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  `;
export const Box = styled.div`
  margin-top: 2%;
  width: 70%;
  z-index: 999;
`;

export const TaskBoxBody = styled.div`
 display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
  height: 700px;
  margin-top: 20px;
`;

export const Column = styled.div`
width: 400px;
  background-color: #f6f9fa;
  border-radius: 15px;
  padding: 17px 25px;
  font-size: 1.4em;
  font-weight: 400;
  font-style: italic;
  transition: 1s;
`;

export const TaskContainer = styled.div`
  width: 100%;
  height: 69vh;
  overflow: auto;
  border: 1px solid rgba(0,0,0,0.3);
  box-shadow: 7px 10px 7px rgb(0 0 0 / 35%);
  border-radius: 20px;
  display:flex;
  /* justify-content: center; */
  flex-direction:column;
  align-items: center;
`;

export const Task = styled.div`
/* position: relative; */
display: flex;
align-items: flex-start;
flex-direction: column;
  width: calc(88%);
  background-color: #333;
  padding: 8px;
  border-radius: 10px;
  margin-top: 18px;
  margin:8px;
  cursor: pointer;
  transition: 0.2s;
  user-select: none;
  border: 2px solid #000;
  outline: none;
  color:#fff;
  &&:hover{
  transition: 0.2s;
  width: calc(92%);
  transform: rotate(3deg);
  }
`;

export const TaskName = styled.div`
width: 100%;
display: flex;
align-items: flex-start;
font-style: normal;
  font-size: 0.9em;
  font-weight: 300;
  &&:before{
    content: '●';
  font-style: normal;
  /* color: #f19737; */
  color: ${theme.primaryLight};
  margin-right: 10px;
  }
  border-bottom: 1px solid white;
`;

export const TaskNameInformation = styled.div`
display: flex;
align-items: flex-start;
font-style: normal;
font-size: 0.9em;
font-weight: 600;
`;

export const TaskDetails = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 0.8em;
  color: #9c9c9c;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
`;

export const ContainerActions = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
`; 

export const RemoveBar = styled.p`
  bottom: 15px;
  right: 15px;
  text-align: end;
  font-size: 3.5em;
  font-weight: 300;
  color: red;
  line-height: 0.1em;
  transition: 0.5s;
  &&:hover {
  color: red;
  font-size: 8em;
  line-height: 0.01em;
  transition: 0.5s;
}
`; 

export const EditBar = styled.p`
  bottom: 15px;
  right: 15px;
  text-align: end;
  font-size: 3.5em;
  font-weight: 300;
  color: ${theme.primaryDark};;
  line-height: 0.1em;
  transition: 0.5s;
  &&:hover {
  color: ${theme.primaryDark};;
  font-size: 8em;
  line-height: 0.01em;
  transition: 0.5s;
}
`; 
