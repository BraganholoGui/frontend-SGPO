import * as S from './style'

const AddTaskButton = ({ handleClick }) => {
  return (
    <S.AddTaskButton onClick={handleClick}>
      +
    </S.AddTaskButton>
  );
};

export default AddTaskButton;
