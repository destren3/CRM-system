import { Button, Input } from '../..';
import { ButtonColors, ButtonSize } from '../../../lib/constants';
import { Todo, TodoRequest } from '../../../lib/types';
import styles from './card.module.scss';
import DeleteIcon from '../../../assets/delete-icon.svg?url';
import EditIcon from '../../../assets/edit-icon.svg?url';

interface TCardUI {
  content: Todo;
  deleteCard: (id: number) => void;
  handleToggleCheckbox: (data: TodoRequest, id: number) => void;
  isChange: boolean;
  handleChangeCardState: (value: boolean) => void;
  handleUpdateCard: (data: TodoRequest, id: number) => void;
  setInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputEditValue: string;
}

export const CardUI = ({
  content,
  deleteCard,
  handleToggleCheckbox,
  isChange,
  handleChangeCardState,
  handleUpdateCard,
  setInputValue,
  inputEditValue,
}: TCardUI) => {
  return (
    <>
      {isChange === false ? (
        <div className={styles.card}>
          {' '}
          <div className={styles[`card-content`]}>
            <input
              type="checkbox"
              checked={content.isDone}
              onChange={() =>
                handleToggleCheckbox(
                  { title: content.title, isDone: !content.isDone },
                  content.id
                )
              }
            />
            <span
              className={content.isDone === true ? styles.strikethrough : ''}
            >
              {content.title}
            </span>
          </div>
          <div className={styles[`buttons-wrapper-actions`]}>
            <Button
              style={ButtonSize.SMALL}
              color={ButtonColors.BLUE}
              content={<img src={EditIcon} />}
              onButtonClick={() => handleChangeCardState(true)}
            />
            <Button
              style={ButtonSize.SMALL}
              color={ButtonColors.RED}
              content={<img src={DeleteIcon} />}
              onButtonClick={() => deleteCard(content.id)}
            />
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <Input
            placeholder="Change task"
            value={inputEditValue}
            onChange={(e) => setInputValue(e)}
          />
          <div className={styles[`buttons-wrapper-edit`]}>
            <Button
              onButtonClick={() => {
                handleUpdateCard(
                  { title: inputEditValue, isDone: content.isDone },
                  content.id
                ),
                  handleChangeCardState(false);
              }}
              content={'Сохранить'}
              color={ButtonColors.BLUE}
              style={ButtonSize.BIG}
            />
            <Button
              onButtonClick={() => handleChangeCardState(false)}
              content={'Отмена'}
              color={ButtonColors.RED}
              style={ButtonSize.BIG}
            />
          </div>
        </div>
      )}
    </>
  );
};
