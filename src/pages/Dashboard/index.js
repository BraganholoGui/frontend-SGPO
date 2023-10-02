import HeaderContent from '../../components/HeaderContent';
// import { Container } from './style';
import { BarChart } from '@mui/icons-material';
import { get } from '../../services/actions';
import { useEffect, useState } from 'react';
import ContainerMain from '../../components/ContainerMain';
import CBox from '../../components/CBox';
import Container from '../../components/Container';
import CreateGraph from './createGraph';
import * as S from './style';
import { CreatePieGraph } from './createPieGraph';
import { CreateBarGraph } from './createBarGraph';
import MinhaImagem from '../../static/Logo/amor.png';

function StockList() {
  const [listProduct, setProductList] = useState([]);
  const [datasets, setDatasets] = useState([]);

  const [datasetsProductsSell, setDatasetsProductsSell] = useState([]);
  const [labelProductsSell, setLabelProductsSell] = useState([]);
  
  const [datasetsProductsPurchased, setDatasetsProductsPurchased] = useState([]);
  const [labelProductsPurchased, setLabelProductsPurchased] = useState([]);

  const [datasetsMaterialPurchased, setDatasetsMaterialPurchased] = useState([]);
  const [labelMaterialPurchased, setLabelMaterialPurchased] = useState([]);

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
          setDatasetsProductsSell(datas[0].data)
          setLabelProductsSell(getAllInfo('productName', response.records).labels);
        }
      });

  }
  async function getMaterials() {
    await get('/purchases')
      .then(async response => {
        if (response) {
          response.records.map(item => {
            if(item.material){
              item.materialName = item.Material.name
            }
          })
          let labels = getAllInfo('materialName', response.records).labels;
          let datas = getAllInfo('materialName', response.records).datasets;
          setDatasetsMaterialPurchased(datas[0].data)
          setLabelMaterialPurchased(getAllInfo('materialName', response.records).labels);
        }
      });

  }
  async function getPurchases() {
    await get('/purchases')
      .then(async response => {
        if (response) {
          response.records.map(item => {
            if(item.product){
              item.productName = item.Product.name
            }
          })
          let labels = getAllInfo('productName', response.records).labels;
          let datas = getAllInfo('productName', response.records).datasets;
          setDatasetsProductsPurchased(datas[0].data)
          setLabelProductsPurchased(getAllInfo('productName', response.records).labels);
        }
      });

  }

  function jsonToJsonArray(info) {
    let list = [];
    if (info && info.length > 0) {
      info.map((item, index) => {
        item = convertObjToArray(item)
        list.push(item)
      })
    }
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
          label: 'Qtd',
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
    getPurchases();
    getMaterials();
  }, [])

  return (
    <S.Container>
      <HeaderContent title="Dashboard" icon={<BarChart fontSize="large" />} />
      <ContainerMain>
      <CBox quantityContainer={2} title={'Produtos e Materiais'}>
        <Container heightLimit={true}>
          Produto mais vendidos
          <CreateBarGraph labels={labelProductsSell} datasets={datasetsProductsSell}></CreateBarGraph>
        </Container>
        <Container heightLimit={true}>
          Produtos com quantidade baixa
          <CreatePieGraph labels={['Quantidade Baixa', 'Quantidade Regulada']} datasets={datasets}/>
        </Container>
        <Container heightLimit={true}>
        Produto mais comprado
          <CreateBarGraph labels={labelProductsPurchased} datasets={datasetsProductsPurchased}></CreateBarGraph>
        </Container>
        <Container heightLimit={true}>
          Material mais comprado
          <CreateBarGraph labels={labelMaterialPurchased} datasets={datasetsMaterialPurchased}></CreateBarGraph>
        </Container>
      </CBox>
      <CBox title={'Análise de planilhas dinâmico'}>
        <Container heightLimit={false}>
          <CreateGraph></CreateGraph>
        </Container>
      </CBox>
      </ContainerMain>
    {/* <img src={MinhaImagem} alt="Minha Imagem" /> */}
    </S.Container>
  )

}

export default StockList;
