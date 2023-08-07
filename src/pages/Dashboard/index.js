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
import { CreateBarGraph } from './createBarGraph';

function StockList() {

  const [listProduct, setProductList] = useState([]);
  const [datasets, setDatasets] = useState([]);

  const [datasetsProductsSell, setDatasetsProductsSell] = useState([]);
  const [labelProductsSell, setLabelProductsSell] = useState([]);

  async function getProducts() {
    await get('/products')
      .then(async response => {
        if (response) {
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
          setProductList(response.records);
        }
      });

  }
  async function getSales() {
    await get('/sales')
      .then(async response => {
        if (response) {
          response.records.map(item => {
            if(item.product){
              item.productName = item.Product.name
            }
          })
          let labels = getAllInfo('productName', response.records).labels;
          let datas = getAllInfo('productName', response.records).datasets;
          console.log(response.records);
          console.log(getAllInfo('productName', response.records))
         
          console.log(labels)
          console.log(datas[0].data)
          setDatasetsProductsSell(datas[0].data)
          setLabelProductsSell(getAllInfo('productName', response.records).labels);
        }
      });

  }

  function jsonToJsonArray(info) {
    console.log(info)
    let list = [];
    if (info && info.length > 0) {
      info.map((item, index) => {
        item = convertObjToArray(item)
        list.push(item)
      })
    }
    console.log(list)
    return list
  }

  function convertObjToArray(obj) {
    var result = Object.keys(obj).map(function (key) {

      return [key, obj[key]];
    });
    return result
  }

  function getAllInfo(table, info) {
    let list = jsonToJsonArray(info);
    let listInfo = [];
    list.map(item => {
      item.map(subitem => {
        if (subitem[0] == table) {
          listInfo.push(subitem[1])
        }
      })
    })
    return createDataInfo(listInfo)

  }

  function groupSames(list) {
    const counts = list.reduce((acc, curr) => {
      if (curr in acc) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});

    return counts
  }
  function createDataInfo(list) {
    let listAux = groupSames(list);
    let listNames = [];
    let listQtds = [];
    listAux = convertObjToArray(listAux)
    listAux.map(item => {
      listNames.push(item[0])
      listQtds.push(item[1])
    })

    let final = {
      labels: listNames,
      datasets: [
        {
          label: '# of Votes',
          data: listQtds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }

    return final;
  }

  useEffect(() => {
    getProducts();
    getSales();
  }, [])

  return (
    <S.Container>
      <HeaderContent title="Dashboard" icon={<Person fontSize="large" />} />
      <ContainerMain>
      <CBox quantityContainer={2}>
        <Container>
          Produto mais vendidos
          <CreateBarGraph labels={labelProductsSell} datasets={datasetsProductsSell}></CreateBarGraph>
          {/* <CreatePieGraph labels={labelProductsSell} datasets={datasetsProductsSell}/> */}
        </Container>
        <Container>
          Produtos com quantidade baixa
          <CreatePieGraph labels={['Quantidade Baixa', 'Quantidade Regulada']} datasets={datasets}/>
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
