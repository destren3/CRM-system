import { Button, Card, Input, Tabs } from '../../../components';
import { ButtonColors, ButtonSize } from '../../../lib/constants';
import { TStatusRU, Todo, TodoRequest } from '../../../lib/types';
import styles from './todos-page.module.scss';

interface TTodosPageUI {
  onButtonAddClick: (data: TodoRequest) => void;
  tabs: TStatusRU[];
  counts: number[];
  cardsContent: Todo[];
  currentTab: TStatusRU;
  setIsCurrentTab: (status: TStatusRU) => void;
  deleteCard: (id: number) => void;
  inputValue: string;
  setInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TodosPageUI = ({
  onButtonAddClick,
  tabs,
  counts,
  cardsContent,
  currentTab,
  setIsCurrentTab,
  deleteCard,
  inputValue,
  setInputValue,
}: TTodosPageUI) => {
  return (
    <div className={styles['page-wrapper']}>
      <div className={styles['add-note-wrapper']}>
        <Input
          placeholder="Task To Be Done"
          value={inputValue}
          onChange={(e) => setInputValue(e)}
        />
        <Button
          onButtonClick={() =>
            onButtonAddClick({ title: inputValue, isDone: false })
          }
          content="Add"
          style={ButtonSize.BIG}
          color={ButtonColors.BLUE}
        />
      </div>

      <div className={styles['tabs-wrapper']}>
        <Tabs
          tabs={tabs}
          counts={counts}
          currentTab={currentTab}
          setIsCurrentTab={setIsCurrentTab}
        />
      </div>

      {cardsContent.length > 0 ? (
        <div className={styles['cards-wrapper']}>
          {cardsContent.map((content) => (
            <Card content={content} key={content.id} deleteCard={deleteCard} />
          ))}
        </div>
      ) : (
        'Загрузка...'
      )}
    </div>
  );
};
