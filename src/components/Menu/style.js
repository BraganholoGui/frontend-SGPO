import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
const COLORS ={
  primaryDark: '#115b4c',
  primaryLight: '#b6edc8',
};

export const MenuLabel = styled.label`
  position: fixed;
  top: 1.7rem;
  left: 0.2rem;
  border-radius: 0% 0% 50% 0%;
  height:4rem;
  width: 4rem;
  cursor: pointer;
  z-index: 99999;
  text-align: center; 
  display: flex;
  justify-content: center;
  flex-direction: center;
`;
export const Nav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-image: radial-gradient(${COLORS.primaryDark},${COLORS.primaryLight});
  /* background:${(props) => (!props.clicked? " #115b4c":"#b6edc8")}; */
  height: 100vh;
  border-radius: 0% 0% 100% 0%;
  width: ${(props) => (props.clicked? " 5rem":" 17rem")};
  height: ${(props) => (props.clicked? " 5rem":" 100vh")};
  transition: transform 3.2s;
`;
export const Icon = styled.span`
cursor: pointer;
 background-color:${(props) => (props.clicked? "transparent":"white")};
 width: 1.5rem;
 height: 2px;
 display: inline-block;
 position: relative;
 margin-top: 0.5rem;
 margin: 0.5rem  0rem 0rem  0.5rem ;
 &::before, &::after{
  content: '';
  background-color: ${(props) => (props.clicked? "black":"white")};;
  width: 1.5rem;
  height: 2px;
  display: inline-block;
  position: absolute;
  left: 0;
  transition: all 0.3s ;
 }
 &::before{
  top:${(props) => (props.clicked? "0":"-0.4rem")};
  transform:${(props) => (props.clicked? "rotate(135deg)":"rotate(0)")};
 }
 &::after{
  top:${(props) => (props.clicked? "0)":"0.4rem")};
  transform:${(props) => (props.clicked? "rotate(-135deg)":"rotate(0)")};
 }
`;

export const Navigation = styled.nav`
 height: 50vh;
 width: 100vh; 
`;

export const List = styled.ul`
position: absolute;
list-style:none;
top: 30%;
left: 40%;
transform:translate(-50%,-50%);
text-align: center;
width: 100%;
display: flex;
flex-direction: column;
li{
  &:hover{
  color: '#fff';
}
}
`;
export const ItemLink = styled(NavLink)`
all: unset;
font-size: 3rem;
font-weight: 300;
text-decoration: none;
color: #000;
&:hover{
  color: #fff;
}
`;
