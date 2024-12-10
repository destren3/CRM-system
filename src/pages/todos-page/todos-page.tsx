import { useEffect, useState } from 'react';
import { Button, Card, Input, Tabs } from '../../components';
import {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from '../../lib/types';
import styles from './todos-page.module.scss';
import {
  deleteNote,
  getNotes,
  postNote,
  updateNote,
} from '../../api/services/notes.service';
import { ButtonColors, ButtonSize } from '../../components/button/button-constants';
import { tabs } from '../../components/tabs/tabs-constants';
import { statusTypes, translationStatusTypes } from '../../components/tabs/status-constants';
import { TStatusRU } from '../../components/tabs/status-types';

export const TodosPage = () => {
  const [todoItems, setTodoItems] = useState<MetaResponse<Todo, TodoInfo>>();
  const [currentTab, setIsCurrentTab] = useState<TStatusRU>(statusTypes.ALL.ru);
  const [inputValue, setInputValue] = useState<string>('');
  const counts = todoItems?.info ? Object.values(todoItems.info) : [0, 0, 0];

  const fetchNotes = async () => {
    try {
      const content = await getNotes(translationStatusTypes[currentTab]);
      setTodoItems(content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCard = async (id: number) => {
    await deleteNote(id);
    await fetchNotes();
  };

  const handleAddCard = async (data: TodoRequest) => {
    await postNote(data);
    await fetchNotes();
    setInputValue('');
  };

	const handleSubmitAddCard = (data: TodoRequest) => {
		if(inputValue.length < 2 || inputValue.length > 64) {
			alert('Текст должен содержать от 2 до 64 символов!')
			return
		} else {
			handleAddCard(data)
		}
	}

  const handleUpdateCard = async (data: TodoRequest, id: number) => {
    await updateNote(data, id);
    await fetchNotes();
  };

  const handleToggleCheckbox = async (data: TodoRequest, id: number) => {
    await updateNote(data, id);
    await fetchNotes();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    fetchNotes();
  }, [currentTab]);

  return (
    <div className={styles['page-wrapper']}>
      <form className={styles['add-note-wrapper']}>
        <Input
          placeholder="Task To Be Done"
          value={inputValue || ''}
          onChange={(e) => handleInputChange(e)}
        />
        <Button
          onButtonClick={() =>
            handleSubmitAddCard({ title: inputValue || '', isDone: false })
          }
          content="Add"
          style={ButtonSize.BIG}
          color={ButtonColors.PRIMARY}
        />
      </form>

      <div className={styles['tabs-wrapper']}>
        <Tabs
          tabs={tabs}
          counts={counts}
          currentTab={currentTab}
          setIsCurrentTab={setIsCurrentTab}
        />
      </div>

      {todoItems && todoItems?.data?.length > 0 ? (
        <div className={styles['cards-wrapper']}>
          {todoItems.data.map((todoItem) => (
            <Card
              todoContent={todoItem}
              key={todoItem.id}
              deleteCard={handleDeleteCard}
              handleToggleCheckbox={handleToggleCheckbox}
              handleUpdateCard={handleUpdateCard}
            />
          ))}
        </div>
      ) : (
        'Загрузка...'
      )}
    </div>
  );
};
