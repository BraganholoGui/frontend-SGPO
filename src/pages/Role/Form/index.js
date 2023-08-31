import HeaderContent from '../../../components/HeaderContent';
import { Psychology } from '@mui/icons-material';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './style';
import InputForm from '../../../components/Form/InputForm';
import FormContent from '../../../components/FormContent';
import ButtonForm from '../../../components/Form/ButtonForm';

function Role() {
  const { id } = useParams();
  const url = `/roles`

  const [data, setData] = useState({});
  const [name, setName] = useState('');
  const [permissionSelected, setPermissionSelected] = useState('');
  const [statusOptions, setStatusOptions] = useState('');

  async function loadData() {
    if (id != 'novo') {
      get(`/roles/${id}`)
        .then(async response => {
          if (response) {
            setData(response.role);
          }
        });
    }
  }

  function buildSubmitObj() {
    let obj = {
      name: name,
      status: permissionSelected ? permissionSelected.id : null,
    }
    return obj;
  }

  function getOptions() {
    get(`/status`) 
      .then(async response => {
        if (response && response.records) {
          response.records = response.records.filter(item => item.id_permission);
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.name
          })
          setStatusOptions(response.records);
          if(data && data.status){
            setPermissionSelected(response.records.find(item => item.id == data.status))
          }
        }
      });

  }

  useEffect(() => {
    loadData();
    getOptions();
  }, [])

  useEffect(() => {
    setName(data.name);
    setPermissionSelected(data?.Status?.name);
  }, [data])

  return (
    <>
      <S.Container>
        <HeaderContent id={id} titleButton="Voltar" linkTo="/roles" title={id == "novo" ? "Novo Cargo" : "Editar Cargo"} icon={<Psychology fontSize="large" />} />
        <FormContent>
          <S.ContentBox>
            <InputForm value={name} setValue={setName} title="Nome do cargo" type='text' size="medium"></InputForm>
            <InputForm options={statusOptions} selected={permissionSelected} setSelected={setPermissionSelected} value={permissionSelected} setValue={setPermissionSelected} title="Status(alterar para radio btton)" type='select' size="small"></InputForm>
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} />
        </FormContent>
      </S.Container>
    </>
  )

}
export default Role;
