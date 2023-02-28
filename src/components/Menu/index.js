import React, { useState } from 'react';
import * as S from './style';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click)
  return (
    <>
      <S.MenuLabel htmlFor='navi-toggle' onClick={handleClick}>
        <S.Icon onClick={handleClick} clicked={!click}></S.Icon>
      </S.MenuLabel>
      <S.Nav clicked={click} onClick={click ? handleClick : null}>
        {
          !click ?
            <S.Navigation >
              <S.List>
                <li>
                  <S.ItemLink clicked={click} to='/'>Home</S.ItemLink>
                </li>
                <li>
                  <S.ItemLink clicked={click} to='/about'>About</S.ItemLink>
                </li>
                <li>
                  <S.ItemLink clicked={click} to='/'>Home</S.ItemLink>
                </li>
                <li>
                  <S.ItemLink clicked={click} to='/'>Home</S.ItemLink>
                </li>
              </S.List>
            </S.Navigation> : null
        }
      </S.Nav>
    </>
  )
}
export default Menu;
