import { useState } from 'react';
import { Button, Input } from '..';
import { Todo, TodoRequest } from '../../lib/types';
import styles from './card.module.scss';
import DeleteIcon from '../../assets/delete-icon.svg?url';
import EditIcon from '../../assets/edit-icon.svg?url';
import { ButtonColors, ButtonSize } from '../button/button-constants';

interface TCard {
  todoContent: Todo;
  deleteCard: (id: number) => void;
  handleToggleCheckbox: (data: TodoRequest, id: number) => void;
  handleUpdateCard: (data: TodoRequest, id: number) => void;
}

export const Card = ({
  todoContent,
  deleteCard,
  handleToggleCheckbox,
  handleUpdateCard,
}: TCard) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputEditValue, setInputEditValue] = useState<string>(
    todoContent.title
  );

  const handleChangeCardState = (value: boolean) => {
    setIsEdit(value), setInputEditValue(todoContent.title);
  };

  const handleInputEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEditValue(e.target.value);
  };

  const handleSubmitUpdateCard = (data: TodoRequest, id: number) => {
    if (inputEditValue.length < 2 || inputEditValue.length > 64) {
      alert('Текст должен содержать от 2 до 64 символов!');
      return;
    } else {
      handleUpdateCard(data, id);
    }
  };

  return (
    <>
      {isEdit === false ? (
        <div className={styles.card}>
          <div className={styles[`card-content`]}>
            <input
              type="checkbox"
              checked={todoContent.isDone}
              onChange={() =>
                handleToggleCheckbox(
                  { title: todoContent.title, isDone: !todoContent.isDone },
                  todoContent.id
                )
              }
            />
            <span
              className={
                todoContent.isDone === true ? styles.strikethrough : ''
              }
            >
              {todoContent.title}
            </span>
          </div>
          <div className={styles[`buttons-wrapper-actions`]}>
            <Button
              style={ButtonSize.SMALL}
              color={ButtonColors.PRIMARY}
              content={<img src={EditIcon} />}
              onButtonClick={() => handleChangeCardState(true)}
            />
            <Button
              style={ButtonSize.SMALL}
              color={ButtonColors.SECONDARY}
              content={<img src={DeleteIcon} />}
              onButtonClick={() => deleteCard(todoContent.id)}
            />
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <Input
            placeholder="Change task"
            value={inputEditValue}
            onChange={(e) => handleInputEditChange(e)}
          />
          <div className={styles[`buttons-wrapper-edit`]}>
            <Button
              onButtonClick={() => {
                handleSubmitUpdateCard(
                  { title: inputEditValue, isDone: todoContent.isDone },
                  todoContent.id
                );
                handleChangeCardState(false);
              }}
              content={'Сохранить'}
              color={ButtonColors.PRIMARY}
              style={ButtonSize.BIG}
            />
            <Button
              onButtonClick={() => handleChangeCardState(false)}
              content={'Отмена'}
              color={ButtonColors.SECONDARY}
              style={ButtonSize.BIG}
            />
          </div>
        </div>
      )}
    </>
  );
};
