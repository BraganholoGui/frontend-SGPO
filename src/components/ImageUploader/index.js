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
  }, [props])

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileInputChange} />
      {console.log(base64Image)}
      {base64Image && <img src={`data:image/jpeg;base64,${base64Image}`} alt="Imagem em base64" style={{ width: '50px', height: 'auto',marginRight:'10px', borderRadius:'50%' }}/>}
    </div>
  );
}

export default ImageUploader;
