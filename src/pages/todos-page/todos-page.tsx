import { useEffect, useState } from 'react';
import { CardTodo } from '../../components';
import { MetaResponse, Todo, TodoInfo, TodoRequest } from '../../lib/types';
import styles from './todos-page.module.scss';
import { getNotes, postNote } from '../../api/services/notes.service';
import { TStatus } from '../../lib/types';
import { Button, Tabs, Input, Form } from 'antd';

export const TodosPage = () => {
  const [todoItems, setTodoItems] = useState<MetaResponse<Todo, TodoInfo>>();
  const [currentTab, setIsCurrentTab] = useState<TStatus>('all');
  const [inputValue, setInputValue] = useState<string>('');
  const [form] = Form.useForm();

  const tabsContent = [
    { label: `Все (${todoItems?.info?.all || 0})`, key: 'all' },
    {
      label: `Сделанные (${todoItems?.info?.completed || 0})`,
      key: 'completed',
    },
    { label: `В работе (${todoItems?.info?.inWork || 0})`, key: 'inWork' },
  ];

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
    form.resetFields();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSetCurrentTab = (key: string) => {
    setIsCurrentTab(key as TStatus);
  };

  useEffect(() => {
    fetchNotes();
    const interval = setInterval(() => {
      fetchNotes();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentTab]);

  return (
    <div className={styles['page-wrapper']}>
      <Form
        form={form}
        className={styles['add-note-wrapper']}
        onFinish={(values) =>
          handleAddCard({ title: values.title || '', isDone: false })
        }
      >
        <Form.Item
          className={styles.input}
          name="title"
          rules={[
            { min: 2, message: 'Задача должна содержать минимум 2 символа.' },
            {
              max: 64,
              message: 'Задача должна содержать не более 64 символов.',
            },
          ]}
        >
          <Input
            placeholder="Task To Be Done"
            value={inputValue || ''}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" content="Add">
          Add
        </Button>
      </Form>

      <div className={styles['tabs-wrapper']}>
        <Tabs
          items={tabsContent}
          activeKey={currentTab}
          onTabClick={handleSetCurrentTab}
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