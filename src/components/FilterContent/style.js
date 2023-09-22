import styled from 'styled-components';
import { GetApp } from '@mui/icons-material';
import {theme} from '../../theme'

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
  width: 85%;
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
  width:2px;
  height: 55px !important; 
  background-color: black; 
  margin: 0 auto;
  transform: rotate(15deg);
`; 
export const IconsContainer = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: center;
  justify-content: space-around;
  width: 10%;
`; 
export const FieldsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`; 
export const FilterTitle = styled.button`
all:unset;
position: relative;
display:flex ;
justify-content:center;
align-items: center;
svg{
  &:hover{
    color:#a0a0a0
  }
}
`; 
export const HoverText = styled.div`
position: absolute;
top: 20px; 
left: 0;
background-color:  ${theme.buttonLock};;
color:white; 
border-radius: 10px;
padding:2px 5px;
z-index: 999999;
`; 
