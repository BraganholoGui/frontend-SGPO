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

export const ContentBox = styled.div`
  width: 100%;
  display:flex ;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
  @media (max-width: 860px) {
    display: inline;
    flex-wrap: wrap;
  }
 
`; 

