import React, { useEffect, useState } from 'react';
import * as S from './style'
import { Close } from '@mui/icons-material';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
function ImageUploader(props) {
  const [base64Image, setBase64Image] = useState('');
  const [value, setValue] = useState('');
  const [openPhoto, setOpenPhoto] = useState('');

  const togglePhoto = () => {
    setOpenPhoto(!openPhoto)
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setBase64Image(base64String);
        setValue(base64String)
        props.setValue(base64String)
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setValue(props.value);
    setBase64Image(props.value);
  }, [props])

  return (
    <S.ContainerMain>
      {base64Image && <S.ImgPhoto onClick={togglePhoto} src={`data:image/jpeg;base64,${base64Image}`} alt="Imagem em base64" />}
      <S.TitlePhoto htmlFor="file-input" className="custom-file-label">
        {'Altere a imagem desse perfil'}
      </S.TitlePhoto>
      <S.InputPhoto type="file" id="file-input" accept="image/*" onChange={handleFileInputChange} />
      <Modal
        isOpen={openPhoto}
        toggle={togglePhoto}
        centered
      >
        <Close onClick={togglePhoto}style={{cursor:'pointer' }} />
        <ModalBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <S.ImgPhotoBig onClick={togglePhoto} src={`data:image/jpeg;base64,${base64Image}`} alt="Imagem em base64" />
        </ModalBody>
      </Modal>
    </S.ContainerMain>
  );
}

export default ImageUploader;
