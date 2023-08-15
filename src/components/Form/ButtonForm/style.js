import styled from 'styled-components';
import { theme } from '../../../theme';

export const Container = styled.div`
margin-top: 3%;
width: 100%;
display: flex;
align-items: center;
justify-content: flex-end;
`; 

export const Box = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: flex-end;
border-top: 1px solid ${theme.primaryDark};
padding: 2%;
padding-bottom: 0;
`; 
export const BoxButton = styled.div`
width: 50%;
display: flex;
align-items: center;
justify-content: flex-end;
border-top: 1px solid ${theme.primaryDark};
`; 

