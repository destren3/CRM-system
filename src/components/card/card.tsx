import { Button } from '..';
import { ButtonColors, ButtonSize } from '../../lib/constants';
import { Todo } from '../../lib/types';
import styles from './card.module.scss';
import DeleteIcon from '../../assets/delete-icon.svg?url';
import EditIcon from '../../assets/edit-icon.svg?url'


interface TCard {
  content: Todo;
}

export const Card = ({ content }: TCard) => {
  return (
    <div className={styles.card}>
      <div className={styles[`card-content`]}>
        <input type="checkbox" />
        {content.title}
      </div>
      <div className={styles[`buttons-wrapper`]}>
        <Button
          style={ButtonSize.SMALL}
          color={ButtonColors.BLUE}
          content={<img src={EditIcon}/>}
          onButtonClick={() => {}}
        />
        <Button
          style={ButtonSize.SMALL}
          color={ButtonColors.RED}
          content={<img src={DeleteIcon}/>}
          onButtonClick={() => {}}
        />
      </div>
    </div>
  );
};
