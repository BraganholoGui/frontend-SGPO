import { useEffect } from 'react';
import { useState } from 'react';
import Button from '../../ButtonLink';
import ButtonSave from '../ButtonSave';
import * as S from './style';

function ButtonForm(props) {

  useEffect(() => {

  }, [])

  return (
    <S.Container>
      <S.Box>
        <ButtonSave/>
      </S.Box>
    </S.Container>

  )

}

export default ButtonForm;
