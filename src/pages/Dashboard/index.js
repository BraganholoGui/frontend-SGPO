import HeaderContent from '../../components/HeaderContent';
// import { Container } from './style';
import { Person } from '@mui/icons-material';
import { get } from '../../services/actions';
import { useEffect, useState } from 'react';
import ContainerMain from '../../components/ContainerMain';
import CBox from '../../components/CBox';
import Container from '../../components/Container';
import CreateGraph from './createGraph';
import * as S from './style';

function StockList() {

  useEffect(() => {
  }, [])

  return (
    <S.Container>
      <HeaderContent title="Dashboard" icon={<Person fontSize="large" />} />
      <ContainerMain>
      <CBox quantityContainer={2}>
        <Container>
          teste
        </Container>
        <Container>
          teste
        </Container>
      </CBox>
      <CBox>
        <Container>
          <CreateGraph></CreateGraph>
        </Container>
      </CBox>
      </ContainerMain>
    </S.Container>
  )

}

export default StockList;
