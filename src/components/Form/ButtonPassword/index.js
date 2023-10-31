import { useState } from 'react';
import { useEffect } from 'react';
import * as S from './style';
import { put, post } from '../../../services/actions'
import { useHistory, useParams } from 'react-router-dom';
import { toast } from '../../../GeneralFunctions/functions'
import { Loading } from '../../Loading';
import { ConstructionOutlined } from '@mui/icons-material';
import { Modal, ModalBody } from 'reactstrap';
import FormContent from '../../FormContent';
import InputForm from '../InputForm';
import ButtonForm from '../ButtonForm';
import ButtonSave from '../ButtonSave';
import Switch from "react-switch"

function ButtonPassword(props) {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory()
  const [newPass, setNewPass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordO, setShowPasswordO] = useState(false);
  const [showPasswordCO, setShowPasswordCO] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilityO = () => {
    setShowPasswordO(!showPasswordO);
  };
  const togglePasswordVisibilityCO = () => {
    setShowPasswordCO(!showPasswordCO);
  };
  const toggleFotrgotPass = () => {
    setForgotPassword(!forgotPassword);
  };

  const toggle = () => setOpenModal(!openModal);

  async function handleSubmit() {

    if (newPass != confirmNewPass) return toast('error', `Senhas incompatíveis`);

    let obj = {
      id,
      oldPassword: oldPass,
      newPass,
      forgotPassword: forgotPassword
    }

    setLoading(true)
    await put(`change-password/${id}`, obj)
      .then(() => {
        toast('success', `Senha atualizada com sucesso!`);
        toggle()
        setLoading(false)
      }).catch((err) => {
        toast('error', err.reason || `Error ao atualizar senha :(`);
        setLoading(false)
      });

  }

  useEffect(() => {
  }, [props])

  return (
    <>
      <S.ButtonSave onClick={() => { toggle(); }}>
        Redefinir Senha
      </S.ButtonSave>
      <Modal
        isOpen={openModal}
        toggle={toggle}
        centered
      >
        <ModalBody>
          <FormContent>
            <S.ContentBox>
              <S.ContainerForm>
                <S.Title>Esqueceu a senha?</S.Title>
                <Switch
                  onChange={toggleFotrgotPass}
                  checked={forgotPassword}
                  onColor="#b6edc8"
                  onHandleColor="#115b4c"
                  offColor="#bac0bc"
                  offHandleColor="#474949"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"

                />
              </S.ContainerForm>

            </S.ContentBox>
            <S.ContentBox>
              <S.ContainerForm>
                <S.Title>Senha antiga</S.Title>
                <S.StyledPasswordInput>
                  {forgotPassword ?
                    <S.PasswordInputBlock
                      readOnly
                      type={showPassword ? 'text' : 'password'}
                    />

                    :
                    <S.PasswordInput
                      type={showPassword ? 'text' : 'password'}
                      value={oldPass}
                      onChange={(e) => {
                        setOldPass(e.target.value)
                      }}
                    />
                  }
                  <S.PasswordToggle onClick={togglePasswordVisibility}>
                    <S.PasswordIcon>
                      {showPassword ? <S.PasswordEyeSlashIcon /> : <S.PasswordEyeIcon />}
                    </S.PasswordIcon>
                  </S.PasswordToggle>
                </S.StyledPasswordInput>
              </S.ContainerForm>

            </S.ContentBox>
            <S.ContentBox>
              <S.ContainerForm>
                <S.Title>Nova senha</S.Title>
                <S.StyledPasswordInput>
                  <S.PasswordInput
                    type={showPasswordO ? 'text' : 'password'}
                    value={newPass}
                    onChange={(e) => {
                      setNewPass(e.target.value)
                    }}
                  />
                  <S.PasswordToggle onClick={togglePasswordVisibilityO}>
                    <S.PasswordIcon>
                      {showPasswordO ? <S.PasswordEyeSlashIcon /> : <S.PasswordEyeIcon />}
                    </S.PasswordIcon>
                  </S.PasswordToggle>
                </S.StyledPasswordInput>
              </S.ContainerForm>

            </S.ContentBox>
            <S.ContentBox>
              <S.ContainerForm>
                <S.Title>Confimre a nova senha</S.Title>
                <S.StyledPasswordInput>
                  <S.PasswordInput
                    type={showPasswordCO ? 'text' : 'password'}
                    value={confirmNewPass}
                    onChange={(e) => {
                      setConfirmNewPass(e.target.value)
                    }}
                  />
                  <S.PasswordToggle onClick={togglePasswordVisibilityCO}>
                    <S.PasswordIcon>
                      {showPasswordCO ? <S.PasswordEyeSlashIcon /> : <S.PasswordEyeIcon />}
                    </S.PasswordIcon>
                  </S.PasswordToggle>
                </S.StyledPasswordInput>
              </S.ContainerForm>
            </S.ContentBox>
            <S.ContentBox>

              {
                loading ?
                  <>
                    <S.ButtonSaveLock >
                      SALVAR
                    </S.ButtonSaveLock>
                    <div style={{ backgroundColor: '#fff' }}>
                      <Loading></Loading>

                    </div>
                  </>
                  : <S.ButtonSave onClick={() => handleSubmit()} >
                    SALVAR
                  </S.ButtonSave>
              }
            </S.ContentBox>

          </FormContent>
        </ModalBody>
      </Modal>
    </>
  )

}

export default ButtonPassword;
