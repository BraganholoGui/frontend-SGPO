import HeaderContent from '../../components/HeaderContent';
import { Container } from './style';
import { Person } from '@mui/icons-material';
import { get } from '../../services/actions';
import { useEffect, useState } from 'react';
import GraphContent from '../../components/Graphs';


function StockList() {

  useEffect(() => {
  }, [])

  return (
    <Container>
      <HeaderContent title="Dashboard" icon={<Person fontSize="large" />} />
      <GraphContent>
      </GraphContent>
    </Container>
  )

}

export default StockList;
