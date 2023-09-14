import React, { useState } from 'react';
import * as S from './style';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from 'react';
import {
  BarChart, Task, AccountTree, ShoppingCart,
  Loyalty,
  Inventory,
  Category,
  Person,
  Groups,
  Psychology,
  People
} from '@mui/icons-material';

const Menu = () => {
  const [click, setClick] = useState(true);
  const [user, setUser] = useState(true);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
    setPermission(JSON.parse(localStorage.getItem('user')).Role.status)
  }, []);

  const handleClick = () => setClick(!click);

  return (
    <>
      <S.MenuLabel htmlFor='navi-toggle' onClick={handleClick}>
        <S.Icon onClick={handleClick} clicked={!click}></S.Icon>
      </S.MenuLabel>
      <S.Nav clicked={click} >
        {
          !click ?
            <S.Navigation >
              {
                permission == 4 ?
                <S.List>
                <li>
                  <BarChart />
                  <a href='/' >Dashboard</a>
                </li>
                <li>
                  <Task />
                  <a href='/tasks'>Tarefas</a>
                </li>
                <li>
                  <AccountTree />
                  <a href='/themes'>Temas</a>
                </li>
                <li>
                  <ShoppingCart />
                  <a href='/purchases' >Compras</a>
                </li>
                <li>
                  <Loyalty />
                  <a href='/sales'>Vendas</a>
                </li>
                <li>
                  <Inventory />
                  <a href='/stock'>Estoque</a>
                </li>
                <li>
                  <Category />
                  <a href='/products'>Produtos</a>
                </li>
                <li>
                  <Category />
                  <a href='/materials'>Materiais</a>
                </li>
                <li>
                  <Person />
                  <a href='/buyers'>Compradores</a>
                </li>
                <li>
                  <Person />
                  <a href='/suppliers'>Fornecedores</a>
                </li>
                <li>
                  <Groups />
                  <a href='/teams'>Times</a>
                </li>
                <li>
                  <Psychology />
                  <a href='/roles'>Cargos</a>
                </li>
                <li>
                  <People />
                  <a href='/users'>Usuários</a>
                </li>
              </S.List>
                  
                  : permission == 5 ?
                  <S.List>
                  <li>
                    <BarChart />
                    <a href='/' >Dashboard</a>
                  </li>
                  <li>
                    <Task />
                    <a href='/tasks'>Tarefas</a>
                  </li>
                  <li>
                    <ShoppingCart />
                    <a href='/purchases' >Compras</a>
                  </li>
                  <li>
                    <Loyalty />
                    <a href='/sales'>Vendas</a>
                  </li>
                  <li>
                    <Inventory />
                    <a href='/stock'>Estoque</a>
                  </li>
                  <li>
                    <Category />
                    <a href='/products'>Produtos</a>
                  </li>
                  <li>
                    <Category />
                    <a href='/materials'>Materiais</a>
                  </li>
                  <li>
                    <Person />
                    <a href='/buyers'>Compradores</a>
                  </li>
                  <li>
                    <Person />
                    <a href='/suppliers'>Fornecedores</a>
                  </li>
                </S.List>
                    :
                    <S.List>
                  <li>
                    <BarChart />
                    <a href='/' >Dashboard</a>
                  </li>
                  <li>
                    <Task />
                    <a href='/tasks'>Tarefas</a>
                  </li>
                  <li>
                    <Inventory />
                    <a href='/stock'>Estoque</a>
                  </li>
                  <li>
                    <Category />
                    <a href='/products'>Produtos</a>
                  </li>
                  <li>
                    <Category />
                    <a href='/materials'>Materiais</a>
                  </li>
                </S.List>
              }

            </S.Navigation> : null
        }
      </S.Nav>
    </>
  )
}
export default Menu;
