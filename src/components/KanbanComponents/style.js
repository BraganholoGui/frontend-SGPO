import styled from 'styled-components';

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
width: 300px;
  max-height: 700px;
  background-color: #f6f9fa;
  border-radius: 15px;
  padding: 17px 25px;
  font-size: 1.4em;
  font-weight: 400;
  font-style: italic;
  transition: 1s;
`; 

export const AddTaskButton = styled.div`
  width: 300px;
  height: 40px;
  font-size: 1.3em;
  line-height: 40px;
  background-color: #ebf1f1;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: 0.5s;
  outline: none;
  text-align: center;
  font-style: normal;
  margin: 15px auto;
  font-size: 1.1em;
  &&:hover{
    background-color: #dee4e4;
  }
`; 

export const TaskContainer = styled.div`
 width: 100%;
  min-height: 30px;
  max-height: 600px;
  overflow: auto;
`; 

export const Task = styled.div`
position: relative;
  width: calc(100% - 33px);
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 18px;
  cursor: pointer;
  transition: 0.2s;
  user-select: none;
  border: 1px solid #ccc;
  outline: none;

  &&:hover{
     background-color: rgba(0, 119, 256, 0.014);
  transition: 0.2s;
  }
`; 

export const TaskName = styled.div`
font-style: normal;
  font-size: 0.9em;
  font-weight: 300;
  line-height: 1.1em;

  &&:before{
    content: '●';
  font-style: normal;
  color: #f19737;
  margin-right: 10px;
  }
`; 

export const TaskDetails = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 0.8em;
  color: #9c9c9c;
  word-wrap: break-word;
  margin-top: 10px;
  line-height: 1.1em;
`; 

export const RemoveBar = styled.p`
position: absolute;
  bottom: 15px;
  right: 15px;
  text-align: end;
  font-size: 3.5em;
  font-weight: 300;
  color: #888;
  line-height: 0.1em;
  transition: 0.5s;
  &&:hover {
  color: red;
  font-size: 8em;
  line-height: 0.01em;
  transition: 0.5s;
}
`; 
