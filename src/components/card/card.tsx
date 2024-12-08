import { Button } from '..';
import { ButtonColors, ButtonSize } from '../../lib/constants';
import { Todo } from '../../lib/types';
import styles from './card.module.scss';
import DeleteIcon from '../../assets/delete-icon.svg?url';
import EditIcon from '../../assets/edit-icon.svg?url';

interface TCard {
  content: Todo;
  deleteCard: (id: number) => void;
}

export const Card = ({ content, deleteCard }: TCard) => {
  return (
    <div className={styles.card}>
      <div className={styles[`card-content`]}>
        <input
          type="checkbox"
          checked={content.isDone === true ? true : false}
        />
        <span className={content.isDone === true ? styles.strikethrough : ''}>
          {content.title}
        </span>
      </div>
      <div className={styles[`buttons-wrapper`]}>
        <Button
          style={ButtonSize.SMALL}
          color={ButtonColors.BLUE}
          content={<img src={EditIcon} />}
          onButtonClick={() => {}}
        />
        <Button
          style={ButtonSize.SMALL}
          color={ButtonColors.RED}
          content={<img src={DeleteIcon} />}
          onButtonClick={() => deleteCard(content.id)}
        />
      </div>
    </div>
  );
};
