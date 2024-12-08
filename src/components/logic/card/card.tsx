import { useCallback, useState } from 'react';
import { CardUI } from '../..';
import { Todo, TodoRequest } from '../../../lib/types';

interface TCard {
  content: Todo;
  deleteCard: (id: number) => void;
  handleToggleCheckbox: (data: TodoRequest, id: number) => void;
  handleUpdateCard: (data: TodoRequest, id: number) => void;
}

export const Card = ({
  content,
  deleteCard,
  handleToggleCheckbox,
  handleUpdateCard,
}: TCard) => {
  const [isChange, setIsChange] = useState<boolean>(false);
  const [inputEditValue, setInputEditValue] = useState<string>(content.title);

  const handleChangeCardState = useCallback(
    (value: boolean) => setIsChange(value),
    []
  );

  const handleInputEditChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputEditValue(e.target.value);
    },
    []
  );

  return (
    <CardUI
      content={content}
      deleteCard={deleteCard}
      handleToggleCheckbox={handleToggleCheckbox}
      isChange={isChange}
      handleChangeCardState={handleChangeCardState}
      handleUpdateCard={handleUpdateCard}
      setInputValue={handleInputEditChange}
      inputEditValue={inputEditValue}
    />
  );
};
