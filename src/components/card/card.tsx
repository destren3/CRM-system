import { Button } from '..';
import { ButtonColors, ButtonSize } from '../../lib/constants';
import { Todo } from '../../lib/types';
import styles from './card.module.scss';

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
          content="Z"
          onButtonClick={() => {}}
        />
        <Button
          style={ButtonSize.BIG}
          color={ButtonColors.RED}
          content="V"
          onButtonClick={() => {}}
        />
      </div>
    </div>
  );
};
