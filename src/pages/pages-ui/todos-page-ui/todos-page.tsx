import { Button, Card, Input, Tabs } from '../../../components';
import { ButtonColors, ButtonSize } from '../../../lib/constants';
import { Todo } from '../../../lib/types';
import styles from './todos-page.module.scss';

interface TTodosPageUI {
  onButtonAddClick: () => void;
  tabs: string[];
  isActive: boolean;
  setIsActive: () => void;
  count: number;
  cardsContent: Todo[];
}

export const TodosPageUI = ({
  onButtonAddClick,
  tabs,
  count,
  isActive,
  setIsActive,
  cardsContent,
}: TTodosPageUI) => {
  return (
    <div className={styles['page-wrapper']}>
      <div className={styles['add-note-wrapper']}>
        <Input placeholder='Task To Be Done' />
        <Button
          onButtonClick={onButtonAddClick}
          content="Add"
          style={ButtonSize.BIG}
          color={ButtonColors.BLUE}
        />
      </div>

      <div className={styles['tabs-wrapper']}>
        <Tabs
          tabs={tabs}
          count={count}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </div>

      <div className={styles['cards-wrapper']}>
        {cardsContent.map((content) => (
          <Card content={content} />
        ))}
      </div>
    </div>
  );
};
