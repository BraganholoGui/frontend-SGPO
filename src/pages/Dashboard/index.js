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
import { CreatePieGraph } from './createPieGraph';

function StockList() {

  const [listProduct, setProductList] = useState([]);
  const [datasets, setDatasets] = useState([]);

  async function getProducts() {
    await get('/products')
      .then(async response => {
        if (response) {
          console.log(response.records);
          let quantity_low = 0;
          let quantity_high = 0;
          response.records.map(item => {
            if(item.quantity < item.quantity_min){
              item.low_quantity = true;
              quantity_low +=1
            }else{
              quantity_high +=1
              item.low_quantity = false;
            }
          })
          setDatasets([quantity_low, quantity_high])
          console.log([quantity_low, quantity_high])
          setProductList(response.records);
        }
      });

  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <S.Container>
      <HeaderContent title="Dashboard" icon={<Person fontSize="large" />} />
      <ContainerMain>
      <CBox quantityContainer={2}>
        <Container>
          Graph 1
        </Container>
        <Container style={{maxHeight:'50px'}}>
          Graph 2
          <CreatePieGraph labels={['Quantidade Baixa', 'Quantidade Regulada']} datasets={datasets} listProduct={listProduct}/>
        </Container>
      </CBox>
      <CBox quantityContainer={2}>
        <Container>
          Graph 3
        </Container>
        <Container>
          Graph 4
        </Container>
      </CBox>
      <CBox>
        <S.DataTitile>
        Análise de planilhas
        </S.DataTitile>
        <Container>
          <CreateGraph></CreateGraph>
        </Container>
      </CBox>
      </ContainerMain>
    </S.Container>
  )

}

export default StockList;
