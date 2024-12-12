import { useState } from 'react';
import { Todo, TodoRequest } from '../../lib/types';
import styles from './card.module.scss';
import { deleteNote, updateNote } from '../../api/services/notes.service';
import { Button, Input, Checkbox } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';

interface TCard {
  todoContent: Todo;
  refreshNotes: () => Promise<void>;
}

export const CardTodo = ({ todoContent, refreshNotes }: TCard) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputEditValue, setInputEditValue] = useState<string>(
    todoContent.title
  );

  const handleDeleteCard = async (id: number) => {
    try {
      await deleteNote(id);
      await refreshNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleCheckbox = async (data: TodoRequest, id: number) => {
    try {
      await updateNote(data, id);
      await refreshNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCardState = (value: boolean) => {
    setIsEdit(value);
    setInputEditValue(todoContent.title);
  };

  const handleInputEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEditValue(e.target.value);
  };

  const handleUpdateCard = async (data: TodoRequest, id: number) => {
    try {
      await updateNote(data, id);
      await refreshNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdateCard = (data: TodoRequest, id: number) => {
    if (inputEditValue.length < 2 || inputEditValue.length > 64) {
      alert('Текст должен содержать от 2 до 64 символов!');
      return;
    }
    handleUpdateCard(data, id);
    handleEditCardState(false);
  };

  return (
    <>
      {!isEdit ? (
        <div className={styles.card}>
          <div className={styles[`card-content`]}>
            <Checkbox
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
              color="primary"
              variant="solid"
              icon={<FormOutlined />}
              onClick={() => handleEditCardState(true)}
            />
            <Button
              color="danger"
              variant="solid"
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteCard(todoContent.id)}
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
              variant="solid"
              color="primary"
              onClick={() => {
                handleSubmitUpdateCard(
                  { title: inputEditValue, isDone: todoContent.isDone },
                  todoContent.id
                );
              }}
            >
              Сохранить
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={() => handleEditCardState(false)}
            >
              Отмена
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
