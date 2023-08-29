import styled from 'styled-components';

export const Container = styled.div`
width: 100%;
`; 
export const Row = styled.a`
font-size: 16px;
text-decoration: none;
color:#000;
&:hover{
  font-style: italic;
  cursor: pointer;
  color:#000;
  font-weight: 700;
}

`; 
export const FilterBoxRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

`; 
export const FilterBoxCol = styled.div`
  display: flex;
  flex-direction: column;
`; 
