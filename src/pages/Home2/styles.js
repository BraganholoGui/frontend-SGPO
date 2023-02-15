import styled from 'styled-components';

export const Header = styled.header`
background-color: #b3ccff;
width: 100%;
display: flex;
align-items: center;
justify-content: space-around;
height:50px;
border-bottom: 1px solid #000;
`;
export const HeaderTitle = styled.div`
width:40%;
color: #000;
font-weight: 700;
font-size: 20px;
display: flex;
align-items: center;
justify-content: center;
.iconTitle{
  margin-right: 2%;
}
`;
export const ContainerHome = styled.div`
background-image: radial-gradient(rgba(0, 150, 229, 0.5), rgb(25, 25, 105));
display: flex;
align-items: center;
justify-content: flex-start;
flex-direction: column;
height:700px;
`;

export const ContainerTable = styled.div`
background-color:   rgb(255, 255, 255);
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
width: 80%;
height: 70%;
border-radius: 20px;
border: 1px solid #000;
box-shadow: 7px 10px 7px rgb(0 0 0 / 35%);
padding: 5%;
margin-top: 5%;
`;

export const ButtonEdit = styled.div`
cursor: pointer;
`;
export const TextButton = styled.div`
border-radius: 5px;
font-size:16px;
font-weight: 600;
`;
export const ButtonForm = styled.button`
min-width: 25%;
height: 35px;
display: flex;
align-items: center;
justify-content: center;
color: #fff;
background: #000;
border-radius: 5px;
font-size:16px;
font-weight: 600;
cursor: pointer;
&&:hover{
    font-style: italic;
}
.iconButton{
margin-left: 5%;
font-size:16px;
font-weight: 600;
}
`;
