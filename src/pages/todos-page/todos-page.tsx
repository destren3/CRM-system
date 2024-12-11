import { useEffect, useState } from 'react';
import { Button, CardTodo, Input, Tabs } from '../../components';
import { MetaResponse, Todo, TodoInfo, TodoRequest } from '../../lib/types';
import styles from './todos-page.module.scss';
import { getNotes, postNote } from '../../api/services/notes.service';
import {
  ButtonColors,
  ButtonSize,
} from '../../components/button/button-constants';
import { tabs } from '../../components/tabs/tabs-constants';
import { statusTypes } from '../../components/tabs/status-constants';
import { TStatus } from '../../components/tabs/status-types';

export const TodosPage = () => {
  const [todoItems, setTodoItems] = useState<MetaResponse<Todo, TodoInfo>>();
  const [currentTab, setIsCurrentTab] = useState<TStatus>(statusTypes.ALL);

  const [inputValue, setInputValue] = useState<string>('');
	const counts = {
		all: todoItems?.info?.all || 0,
		completed: todoItems?.info?.completed || 0,
		inWork: todoItems?.info?.inWork || 0,
	};	

  const fetchNotes = async () => {
    try {
      const todos = await getNotes(currentTab);
      setTodoItems(todos);
    } catch (error) {
      alert(`Произошла ошибка при получении заметок: ${error}`);
    }
  };

  const handleAddCard = async (data: TodoRequest) => {
    await postNote(data);
    await fetchNotes();
    setInputValue('');
  };

  const handleSubmitAddCard = (
    e: React.FormEvent<HTMLFormElement>,
    data: TodoRequest
  ) => {
    e.preventDefault();
    if (inputValue.length < 2 || inputValue.length > 64) {
      alert('Текст должен содержать от 2 до 64 символов!');
      return;
    } else {
      handleAddCard(data);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    fetchNotes();
  }, [currentTab]);

  return (
    <div className={styles['page-wrapper']}>
      <form
        className={styles['add-note-wrapper']}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
          handleSubmitAddCard(e, { title: inputValue || '', isDone: false })
        }
      >
        <Input
          placeholder="Task To Be Done"
          value={inputValue || ''}
          onChange={handleInputChange}
        />
        <Button
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
            <CardTodo
              todoContent={todoItem}
              key={todoItem.id}
              refreshNotes={fetchNotes}
            />
          ))}
        </div>
      ) : (
        'Загрузка...'
      )}
    </div>
  );
};
