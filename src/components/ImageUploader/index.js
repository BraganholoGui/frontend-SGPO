import React, { useEffect, useState } from 'react';

function ImageUploader(props) {
  const [base64Image, setBase64Image] = useState('');
  const [value, setValue] = useState('');

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
    <div>
      <label htmlFor="file-input" className="custom-file-label" style={{ borderRadius:'20px', border:'1px solid #115b4c', padding:'10px', marginRight:'10px' }}>
        { 'Escolha uma imagem para seu perfil'}
      </label>
      <input  type="file" id="file-input" accept="image/*" onChange={handleFileInputChange} style={{ display: 'none' }} />
      {console.log(base64Image)}
      {base64Image && <img src={`data:image/jpeg;base64,${base64Image}`} alt="Imagem em base64" style={{ width: '50px', height: 'auto',marginRight:'10px', borderRadius:'50%' }}/>}
    </div>
  );
}

export default ImageUploader;
