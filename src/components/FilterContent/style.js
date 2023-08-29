import styled from 'styled-components';
import { GetApp } from '@mui/icons-material';

export const ContainerMain = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-top: 2%; */
  `; 
export const Box = styled.div`
  background-color: #f8f8f8;
  height: ${(props) => (props.spaceTitle ? `100px`: `75px`)};
  width: 70%;
  border-radius: 15px;
  display: flex;
  justify-content:space-between;
  align-items: center;
  padding: 15px 10px;
`; 
export const ExportIcon = styled(GetApp)`
  cursor: pointer;
`; 
export const VerticalHr = styled.hr`
  width: 1px;
  height: 40px; 
  background-color: black; 
  margin: 0 auto;
`; 
export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 12%;
`; 
export const FieldsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
`; 
export const FilterTitle = styled.button`
all:unset;
display:flex ;
justify-content:center;
align-items: center;
`; 
