import React, { useState } from 'react';
import * as S from './style';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from 'react';

const Menu = () => {
  const [click, setClick] = useState(true);

  const handleClick = () => setClick(!click);

  return (
    <>
      <S.MenuLabel htmlFor='navi-toggle' onClick={handleClick}>
        <S.Icon onClick={handleClick} clicked={!click }></S.Icon>
      </S.MenuLabel>
      <S.Nav clicked={click} >
        {
          !click ?
            <S.Navigation >
              <S.List>
                <li>
                  <a href='/' >Dashboard</a>
                </li>
                <li>
                  <a href='/about'>About</a>
                </li>
                <li>
                  <a href='/' >Tarefas</a>
                </li>
                <li>
                  <a href='/'>Produtos</a>
                </li>
                <li>
                  <a href='/'>Estoque</a>
                </li>
                <li>
                  <a href='/'>Usuários</a>
                </li>
              </S.List>
            </S.Navigation> : null
        }
      </S.Nav>
    </>
  )
}
export default Menu;
