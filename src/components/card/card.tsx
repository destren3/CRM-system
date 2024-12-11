import { useState } from 'react';
import { Button, Input } from '..';
import { Todo, TodoRequest } from '../../lib/types';
import styles from './card.module.scss';
import DeleteIcon from '../../assets/delete-icon.svg?url';
import EditIcon from '../../assets/edit-icon.svg?url';
import { ButtonColors, ButtonSize } from '../button/button-constants';
import { deleteNote, updateNote } from '../../api/services/notes.service';

interface TCard {
  todoContent: Todo;
  refreshNotes: () => void;
}

export const Card = ({ todoContent, refreshNotes }: TCard) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputEditValue, setInputEditValue] = useState<string>(
    todoContent.title
  );

  const handleDeleteCard = async (id: number) => {
    await deleteNote(id);
    refreshNotes();
  };

  const handleToggleCheckbox = async (data: TodoRequest, id: number) => {
    await updateNote(data, id);
    refreshNotes();
  };

  const handleEditCardState = (value: boolean) => {
    setIsEdit(value);
    setInputEditValue(todoContent.title);
  };

  const handleInputEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEditValue(e.target.value);
  };

  const handleUpdateCard = async (data: TodoRequest, id: number) => {
    await updateNote(data, id);
    refreshNotes();
  };

  const handleSubmitUpdateCard = (data: TodoRequest, id: number) => {
    if (inputEditValue.length < 2 || inputEditValue.length > 64) {
      alert('Текст должен содержать от 2 до 64 символов!');
      return;
    } else {
      handleUpdateCard(data, id);
      handleEditCardState(false);
    }
  };

  return (
    <>
      {!isEdit ? (
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
            <span className={todoContent.isDone ? styles.strikethrough : ''}>
              {todoContent.title}
            </span>
          </div>
          <div className={styles[`buttons-wrapper-actions`]}>
            <Button
              style={ButtonSize.SMALL}
              color={ButtonColors.PRIMARY}
              content={<img src={EditIcon} />}
              onButtonClick={() => handleEditCardState(true)}
            />
            <Button
              style={ButtonSize.SMALL}
              color={ButtonColors.SECONDARY}
              content={<img src={DeleteIcon} />}
              onButtonClick={() => handleDeleteCard(todoContent.id)}
            />
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <Input
            placeholder="Change task"
            value={inputEditValue}
            onChange={handleInputEditChange}
          />
          <div className={styles[`buttons-wrapper-edit`]}>
            <Button
              onButtonClick={() => {
                handleSubmitUpdateCard(
                  { title: inputEditValue, isDone: todoContent.isDone },
                  todoContent.id
                );
              }}
              content={'Сохранить'}
              color={ButtonColors.PRIMARY}
              style={ButtonSize.BIG}
            />
            <Button
              onButtonClick={() => handleEditCardState(false)}
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
