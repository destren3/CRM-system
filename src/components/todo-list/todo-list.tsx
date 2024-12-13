import { CardTodo } from '..';
import { MetaResponse, Todo, TodoInfo } from '../../lib/types';
import styles from './todo-list.module.scss';

interface TTodoList {
  todoItems: MetaResponse<Todo, TodoInfo>;
  fetchNotes: () => Promise<void>;
}

export const TodoList = ({ todoItems, fetchNotes }: TTodoList) => {
  return (
    <div className={styles['cards-wrapper']}>
      {todoItems.data.map((todoItem) => (
        <CardTodo
          todoContent={todoItem}
          key={todoItem.id}
          refreshNotes={fetchNotes}
        />
      ))}
    </div>
  );
};
