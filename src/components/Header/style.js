import styled from 'styled-components';

export const ContainerMain = styled.div`
  width: 100%;
  display:flex;
  justify-content: flex-end;
  align-items: center;
  background-color:#115b4c;
  height:5rem;
  top: 0rem;
`;

export const Title = styled.div`
 width: 65%;
 display:flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 3vh;
  @media (max-width: 1400px) {
     width: 70%;
     font-size: 2.5vh;
  }
`;
export const Profile = styled.div`
 width: 25%;
 display:flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 50px;
  color: #fff;

  .icon-profile{
cursor: pointer;

  }
  @media (max-width: 1400px) {
     width: 30%;
     font-size: 2.5vh;
  }
`;
export const ProfileInfo = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: #fff;

`; 
export const UserInfo = styled.div`
width: 100%;
display:flex;
color: #fff;
font-size: 18px;
justify-content: center;
align-items:center ;
`; 
export const RoleInfo = styled.div`
width: 100%;
display:flex;
justify-content: center;
align-items:center ;
color: #fff;
font-size: 14px;
`; 

export const VerticalHr = styled.hr`
  width: 4px;
  height: 70px !important; 
  background-color: white; 
`; 
export const Logout = styled.div`
  background-color: black; 
  border-radius: 7px;
  padding: 5px;
  cursor: pointer;
`; 
export const ContainerLogout = styled.div`
  display:flex;
   flex-direction:column; 
   margin-left:15px; 
   cursor:pointer;
`; 
